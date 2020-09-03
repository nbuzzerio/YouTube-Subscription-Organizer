import React, { useState, useEffect } from 'react';
import getGoogleSignIn from './_getGoogleSignIn.js';

function GoogleLoginBtn(props) {

  const [googleAuth, setGoogleAuth] = useState('unavailable');

    useEffect( () => {
      let mounted = true;
      getGoogleSignIn()
      .then(signInLink => {
        if (mounted) {
          setGoogleAuth(signInLink)
        }
      })
      .catch((err) => {
        console.log(err);
        if(mounted) {
          setGoogleAuth('Sorry, google authentication not available at this time');
        }
      })
      return () => {
        mounted = false;
      }
    }, [])
 
  return <a href={googleAuth}>Login With Google</a>

}
export default GoogleLoginBtn;



