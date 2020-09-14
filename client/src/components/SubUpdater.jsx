import React, { useState, useEffect } from 'react';
import getUpdatedUserSubs from './_getUpdatedUserSubs.js';

function SubUpdater(props) {
    const updateSubs = () => {
        let mounted = true;
        getUpdatedUserSubs(props.userId)
            .then(userSubs => {
                if (mounted) {
                    props.setSubs(userSubs);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        return () => {
            mounted = false;
        }
    };

    return (
        <div>
            <h4>SubUpdater PlaceHolder</h4>
            <button onClick={updateSubs}>Update Subscriptions</button>
        </div>
    );

};
export default SubUpdater;