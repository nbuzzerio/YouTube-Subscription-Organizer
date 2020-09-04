const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

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
  })
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
        return res.redirect('/')
      }
      const accessToken = jwt.sign(token, CONFIG.ACCESS_TOKEN_SECRET);

      // res.redirect({accessToken: accessToken}, '/');
      res.cookie('accessToken', accessToken)
      return res.redirect('/');
    });
  }
});

app.get('/subscription_organizer', (req, res) => {
  console.log('Do we arrive here?')
  if (!req.cookies.accessToken) {
    return res.redirect('/')
  }

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const youtube = google.youtube('v3');

  youtube.subscriptions.list({
    auth: oauth2client,
    mine: true,
    part: 'snippet, contentDetails',
    maxResults: 50
  })
    .then((response) => {
      console.log(response)

      return res.send({ subscriptions: response.data.items })
    });

});

app.get('/googleUserInfo', (req, res) => {

  if (!req.cookies.accessToken) {
    return res.redirect('/')
  }

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const oauth2 = google.oauth2('v2')

  oauth2.userinfo.get({
    auth: oauth2client
  })
    .then((response) => {
      let userData = response.data
      // create a new row for this user in the table
      db.sync()
        .then(() => {
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
              console.log('err logging in:', err)
            })
        })
    });

});

app.get('/getUserCategories', (req, res) => {

  if (!req.cookies.accessToken) {
    return res.redirect('/')
  }

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
  );

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  let userId = req.query.user;
  db.sync()
    .then(() => {
      models.Category.findAll({
        include: [{
          model: models.User,
          where: {
            User_Id: userId
          },
        }]
      })
        .then((response) => {
          res.send(response[0]);
        })
        .catch(err => {
          console.log('err logging in:', err)
        })
    });

});

app.listen(CONFIG.port, () => {
  console.log(`YouTube-Subscription-Organizer app listening at ${CONFIG.baseUrl}`);
});