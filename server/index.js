const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { google } = require('googleapis');

const app = express();

app.use(express.static('./client/dist'))

app.get('/search', (req, res) => {
  google.youtube('v3').search.list({
    key: process.env.YouTubeAPIKey,
    part: 'snippet',
    q: 'saveafox'
  }).then( (response) => {
    // console.log(response);
    res.send(response.data);
  }).catch((err) => {
    console.log(err)
    res.send('There was an error while searching')
  })
})

app.get('/subscriptions', (req, res) => {
  google.youtube('v3').subscriptions.list({
    key: process.env.YouTubeAPIKey,
    part: 'snippet',
    q: 'saveafox'
  }).then( (response) => {
    console.log(response);
    res.send(response.data);
  }).catch((err) => {
    console.log(err)
    res.send('There was an error while searching')
  })
})

const port = 3000;

app.listen(port, () => {
  console.log(`YTSubOrganizer app listening at http://localhost:${port}`);
})