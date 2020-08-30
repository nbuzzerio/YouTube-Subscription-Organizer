import React, { useState, useEffect } from 'react';
import CategoryContainer from './CategoryContainer.jsx';
import SubContainer from './SubContainer.jsx';
import NewChannelContainer from './NewChannelContainer.jsx';
import getGoogleUserInfo from '../components/_getGoogleUserInfo.js';

function SignedInContainer() {

    const [userData, setUserData] = useState({});

    useEffect( () => {
        let mounted = true;
    
        getGoogleUserInfo()
        .then(userInfo => {
          if (mounted) {
            setUserData(userInfo.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        return () => {
          mounted = false;
        }
    }, [])

    return (
        <div>
            <h2 className='user'>HELLO, {userData.given_name}</h2>
            <CategoryContainer />
            <SubContainer />
            <NewChannelContainer />
        </div>
    )

}
export default SignedInContainer;