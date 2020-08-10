import React, { useState } from 'react';
import {GoogleLogin} from 'react-google-login'


function GoogleSignIn(props) {

    const responseGoogle = (response) => {
        props.setName(response.profileObj.name);
        props.setEmail(response.profileObj.email);
        props.setUrl(response.profileObj.imageUrl);
        props.setLoggedIn(true)
        console.log(response);
    }

    return (
    <div className="signIn">
      <h1>Log In With Google</h1>
      <GoogleLogin
        clientId="153363869157-a9bs4h76s9v7ulru8akgf584ipl8inje.apps.googleusercontent.com"
        buttonText="Log In"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
    )

}
export default GoogleSignIn;