import React, { useState, useEffect } from 'react';
import GoogleLoginBtn from '../components/GoogleLoginBtn.jsx';
import SignedInContainer from './SignedInContainer.jsx';

function App(props) {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect( () => {
    if (props.cookie.substr(0, 11) === 'accessToken') {
      setLoggedIn(true);
    }
  }, [])

  const loggedInHandler = bool => {
    document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    setLoggedIn(bool);
  }

  let display;

  if (loggedIn) {
    display = 
    <div>
      <button onClick={loggedInHandler.bind(this, false)}>Sign Out</button>
      <SignedInContainer />
    </div>
  } else {
    display = <GoogleLoginBtn />
  }
  
  return (
    <div className="app">
      <h1>WELCOME TO YOUTUBE SUBSCRIPTION ORGANIZER</h1>
      {display}
    </div>
  )

}
export default App;