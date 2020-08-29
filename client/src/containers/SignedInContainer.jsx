import React, { useState, useEffect } from 'react';
import CategoryContainer from './CategoryContainer.jsx';
import SubContainer from './SubContainer.jsx';
import NewChannelContainer from './NewChannelContainer.jsx';

function SignedInContainer(props) {

    return (
        <div>
            <h2>HELLO, {props.userData.given_name}</h2>
            <CategoryContainer />
            <SubContainer />
            <NewChannelContainer />
        </div>
    )

}
export default SignedInContainer;



