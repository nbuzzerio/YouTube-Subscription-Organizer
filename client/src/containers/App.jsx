import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [googleAuth, setGoogleAuth] = useState('unavailable');
  const [accessToken, setAccessToken] = useState(null);

  if (document.cookie !== accessToken) {
    setAccessToken(document.cookie);
  }

  if (!accessToken) {
    useEffect( () => {
      axios({
        method: 'get',
        url: '/googleAuth',
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setGoogleAuth(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setGoogleAuth('Sorry, google authentication not available at this time');
      })
    }, [])
  }

  useEffect( () => {
    console.log('we getting here?')
    axios({
      method: 'get',
      url: '/subscription_organizer'
    })
    .then(function (response) {
      // handle success
      console.log('Subs?:', response.data);
    })
    .catch(function (error) {
      console.log('but are we getting there?')

      // handle error
      console.log(error);
    })
  }, [accessToken])
  
  return (
    <div className="app">
      <h1>YOUTUBE SUBSCRIPTION ORGANIZER</h1>
      <a href={googleAuth}>Login With Google</a>
    </div>
  )

}
export default App;