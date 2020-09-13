import React, { useState, useEffect } from 'react';
import SubFilter from '../components/SubFilter.jsx';
import getUpdatedUserSubs from '../components/_getUpdatedUserSubs.js';

function SubUpdater(props) {
    const updateSubs = () => {
        getUpdatedUserSubs(props.userId)
            .then(userSubs => {
                console.log(userSubs)
                props.setSubs(userSubs);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            <h4>SubUpdater PlaceHolder</h4>
            <button onClick={updateSubs}>Update Subscriptions</button>
            <SubFilter />
        </div>
    );

};
export default SubUpdater;
