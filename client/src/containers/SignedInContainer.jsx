import React, { useState, useEffect } from 'react';
import CategoryContainer from './CategoryContainer.jsx';
import SubContainer from './SubContainer.jsx';
import NewChannelContainer from './NewChannelContainer.jsx';
import ChosenCategoryContainer from './ChosenCategoryContainer.jsx';
import getGoogleUserInfo from '../components/_getGoogleUserInfo.js';
import './SignedInContainer.css'

function SignedInContainer() {

  const [userData, setUserData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
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

  let display;
  if (userData && selectedCategory) {
    display = <div className='signedInDisplay'>
      <ChosenCategoryContainer categoryInfo={selectedCategory} userId={userData.id} setSelectedCategory={setSelectedCategory}/>
    </div>
  } else if (userData && !selectedCategory) {
    display = <div className='signedInDisplay'>
      <h2 className='welcome' >Hello, {userData.given_name}</h2>
      <CategoryContainer userData={userData} setSelectedCategory={setSelectedCategory} />
      <SubContainer userData={userData} />
      <NewChannelContainer />
    </div>
  } else {
    display = <h2>Signing in...</h2>
  }

  return (
    <div className='signedInContainer'>
      {display}
    </div>
  )

}
export default SignedInContainer;