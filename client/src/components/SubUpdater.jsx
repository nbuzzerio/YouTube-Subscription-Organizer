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
        <div className='subUpdater'>
            <div className='subUpdaterBtn' onClick={updateSubs}>
                <p className='subUpdaterBtnTxt'>Update Subscriptions</p>
            </div>
        </div>
    );

};
export default SubUpdater;