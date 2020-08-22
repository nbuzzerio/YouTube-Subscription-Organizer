import React, { useState, useEffect } from 'react';
import getGoogleSignIn from './_getGoogleSignIn.js'

function GoogleLoginBtn(props) {

  const [googleAuth, setGoogleAuth] = useState('unavailable');

    useEffect( () => {
      getGoogleSignIn()
      .then(signInLink => {
        setGoogleAuth(signInLink)
      })
      .catch((err) => {
        console.log(err);
        setGoogleAuth('Sorry, google authentication not available at this time');
      })
    }, [])
 
  return <a href={googleAuth}>{'Login With Google'}</a>

}
export default GoogleLoginBtn;



