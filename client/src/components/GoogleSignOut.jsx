import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';


function GoogleSignOut(props) {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [url, setUrl] = useState("");

    const logout = (response) => {
      props.setName('');
      props.setEmail('');
      props.setUrl('');
      props.setLoggedIn(false)
      console.log(response);
    }
    
    return (
    <div className="signOut">
      <h1>Log In With Google</h1>
      <GoogleLogout
      clientId="153363869157-a9bs4h76s9v7ulru8akgf584ipl8inje.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      />
    {/* </GoogleLogout> */}
    </div>
    )

}
export default GoogleSignOut;