const express = require('express');
require('dotenv').config();
const app = express();

const CONFIG = require('../config/youtube.config.js');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

app.use(cookieParser())
app.use(express.static('./client/dist'))

//Send Login Screen
app.get('/googleAuth', (req, res) => {
  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
    )

    const loginLink = oauth2client.generateAuthUrl({
      access_type: 'offline',
      scope: CONFIG.oauth2Credentials.scopes
    })
    res.send(loginLink);
})

//Handle authorization step
app.get('/OAuth', (req, res) => {

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
    )
  
  if (req.query.error){
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
    })
  }
})

app.get('/subscription_organizer', (req, res) => {
  console.log('Do we arrive here?')
  if (!req.cookies.accessToken) {
    return res.redirect('/')
  }

  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0],
    )

  oauth2client.credentials = jwt.verify(req.cookies.accessToken, CONFIG.ACCESS_TOKEN_SECRET);

  const youtube = google.youtube('v3');
  
  youtube.subscriptions.list({
    auth: oauth2client,
    mine: true,
    part: 'snippet, contentDetails',
    maxResults:50
  })
  .then( (response) => {
    console.log(response)

    return res.send({subscriptions: response.data.items})
  })

})

app.listen(CONFIG.port, () => {
  console.log(`YouTube-Subscription-Organizer app listening at ${CONFIG.baseUrl}`);
})