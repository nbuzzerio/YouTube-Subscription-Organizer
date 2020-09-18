const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//////////////////////////////////////////////////////
//                    DATABASE                      //
//////////////////////////////////////////////////////
const db = require('../database/index.js');
const models = require('../database/models.js');
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
db.sync();
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

const CONFIG = require('../config/youtube.config.js');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const OAuth2 = google.auth.OAuth2;

app.use(cookieParser());
app.use(express.static('./client/dist'));

//Send Login Screen
app.get('/googleAuth', (req, res) => {
  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  const loginLink = oauth2client.generateAuthUrl({
    access_type: 'offline',
    scope: CONFIG.oauth2Credentials.scopes
  });
  res.send(loginLink);
});

//Handle authorization step
app.get('/OAuth', (req, res) => {

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  if (req.query.error) {
    //if user rejects permissions
    return res.redirect('/');
  } else {
    oauth2client.getToken(req.query.code, (err, token) => {
      if (err) {
        return res.redirect('/');
      }
      const accessToken = jwt.sign(token, CONFIG.ACCESS_TOKEN_SECRET);

      // res.redirect({accessToken: accessToken}, '/');
      res.cookie('accessToken', accessToken);
      return res.redirect('/');
    });
  };
});

app.get('/getSubs', (req, res) => {
  if (!req.cookies.accessToken) {
    return res.redirect('/')
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  let userId = req.query.user;

  models.Channel.findAll({
    include: [{
      model: models.Subscription,
      where: {
        UserUserId: userId
      },
    }]
  })
    .then((response) => {
      res.send(response);
    })
    .catch(err => {
      console.log('Error finding User Subscriptions:', err)
    });
});

app.get('/updateSubs', (req, res) => {
  if (!req.cookies.accessToken) {
    return res.redirect('/')
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const youtube = google.youtube('v3');

  let subs = [];
  let params;
  let nextPageToken;
  let userId = req.query.user;

  const getAllData = async () => {
    if (subs.length === 0) {
      params = {
        auth: oauth2client,
        mine: true,
        part: 'snippet, contentDetails',
        maxResults: 50
      };
    } else {
      params = {
        auth: oauth2client,
        mine: true,
        part: 'snippet, contentDetails',
        maxResults: 50,
        pageToken: nextPageToken
      };
    };

    await youtube.subscriptions.list(params)
      .then((response) => {
        subs = subs.concat(response.data.items);
        if (response.data.nextPageToken) {
          nextPageToken = response.data.nextPageToken;
          getAllData();
        } else {

          let channelsData = subs.map((sub) => {
            return ({
              Channel_Id: sub.snippet.resourceId.channelId,
              Channel_Name: sub.snippet.title,
              Channel_URL: `https://www.youtube.com/channel/${sub.snippet.resourceId.channelId}/`,
              default_img_URL: sub.snippet.thumbnails.default.url,
              medium_img_URL: sub.snippet.thumbnails.medium.url,
              high_img_URL: sub.snippet.thumbnails.high.url,
              Channel_Description: sub.snippet.description,
              Total_Videos: sub.contentDetails.totalItemCount
            });
          });
          let subscriptionsData = subs.map((sub) => {
            return ({
              Subscription_Id: `${userId}_${sub.snippet.resourceId.channelId}`,
              UserUserId: userId,
              ChannelChannelId: sub.snippet.resourceId.channelId,
            });
          });
          models.Channel.bulkCreate(channelsData, {
            updateOnDuplicate: [
              'Channel_Name',
              'Channel_URL',
              'default_img_URL',
              'medium_img_URL',
              'high_img_URL',
              'Channel_Description',
              'Total_Videos',
              'updatedAt',
            ]
          })
            .then((response) => {
              models.Subscription.bulkCreate(subscriptionsData, {
                updateOnDuplicate: [
                  'Subscription_Id',
                  'UserUserId',
                  'ChannelChannelId',
                ]
              })
                .then((response) => {
                  models.Channel.findAll({
                    include: [{
                      model: models.Subscription,
                      where: {
                        UserUserId: userId
                      },
                    }]
                  })
                    .then((response) => {
                      res.send(response);
                    })
                    .catch(err => {
                      console.log('Error finding User Subscriptions:', err)
                    });
                })
                .catch(err => {
                  console.log('Error updating Subscriptions:', err);
                });
            })
            .catch(err => {
              console.log('Error updating Channels:', err);
            });
        };
      })
      .catch((err) => {
        console.log('Error getting subs from API: ', err);
      });
  };
  getAllData();
});

app.get('/googleUserInfo', (req, res) => {

  if (!req.cookies.accessToken) {
    return res.redirect('/');
  }

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const oauth2 = google.oauth2('v2');

  oauth2.userinfo.get({
    auth: oauth2client
  })
    .then((response) => {
      let userData = response.data
      models.User.findOrCreate({
        where: {
          User_Id: userData.id
        },
        defaults: {
          User_Id: userData.id,
          Email: userData.email,
          Name: userData.given_name
        }
      })
        .then((response) => {
          //send info to client only once it is saved
          res.send(userData);
        })
        .catch(err => {
          console.log('Error creating User:', err);
        });
    });
});

app.get('/getUserCategories', (req, res) => {

  if (!req.cookies.accessToken) {
    return res.redirect('/');
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  let userId = req.query.user;

  models.Category.findAll({
    include: [{
      model: models.User,
      where: {
        User_Id: userId
      },
    }]
  })
    .then((response) => {
      res.send(response);
    })
    .catch(err => {
      console.log('Error finding User Categories:', err)
    });
});

app.post('/postNewCategory', (req, res) => {

  if (!req.cookies.accessToken) {
    return res.redirect('/');
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const category = req.body;
  models.Category.findOrCreate({
    where: {
      Category_Name: category.newCategory,
      UserUserId: category.userId
    },
    defaults: {
      Category_Name: category.newCategory,
      UserUserId: category.userId
    }
  })
    .then((response) => {
      models.Category.findAll({
        include: [{
          model: models.User,
          where: {
            User_Id: category.userId
          },
        }]
      })
        .then((response) => {
          res.send(response);
        })
        .catch(err => {
          console.log('Error getting User Categories', err)
          res.sendStatus(409);
        })
    })
    .catch(err => {
      console.log('Error creating category:', err)
      res.sendStatus(409);
    });
});

app.post('/postChannelToCategory', (req, res) => {

  if (!req.cookies.accessToken) {
    return res.redirect('/');
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const addedChannel = req.body.addedChannel;
  const categoryId = req.body.categoryId;

  models.Category_Channel.findOrCreate({
    where: {
      Category_Channel_Id: `${categoryId}_${addedChannel}`
    },
    defaults: {
      ChannelChannelId: addedChannel,
      CategoryCategoryId: categoryId
    }
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log('Error adding channel to category:', err)
      res.sendStatus(409);
    });
});

app.get('/getCategorySubs', (req, res) => {
  if (!req.cookies.accessToken) {
    return res.redirect('/')
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  let userId = req.query.user;
  let categoryId = req.query.categoryId

  models.Channel.findAll({
    include: [{
      model: models.Category_Channel,
      where: {
        CategoryCategoryId: categoryId
      },
      include: [{
        model: models.Category,
        where: {
          UserUserId: userId
        }
      }]
    }]
  })
    .then((response) => {
      res.send(response);
    })
    .catch(err => {
      console.log('Error finding Category Channels:', err)
    });
});

app.get('/getSubVideos', (req, res) => {
  if (!req.cookies.accessToken) {
    return res.redirect('/')
  };

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const youtube = google.youtube('v3');

  const channelIds = req.query.channelIds
  if (channelIds) {
    youtube.channels.list({
      auth: oauth2client,
      id: channelIds,
      part: 'contentDetails',
      maxResults: 10
    })
      .then((response) => {

        let channelsData = response.data.items;

        let uploads = channelsData.map((channelData) => {

          return (
            youtube.playlistItems.list({
              auth: oauth2client,
              playlistId: channelData.contentDetails.relatedPlaylists.uploads,
              part: 'snippet, contentDetails',
              maxResults: 10
            })
          );

        });

        Promise.all(uploads).then((videos) => {
          res.send(videos);
        })
      })
      .catch((err) => {
        res.send(err)
      });
  } else {
    res.sendStatus(200);
  }
});

app.listen(CONFIG.port, () => {
  console.log(`YouTube-Subscription-Organizer app listening at ${CONFIG.baseUrl}`);
});