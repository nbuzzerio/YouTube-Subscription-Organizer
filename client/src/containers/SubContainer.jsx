import React, { useState, useEffect } from 'react';
import SubUpdater from '../components/SubUpdater.jsx';
import SubCarousel from '../components/SubCarousel.jsx';
import getUserSubs from '../components/_getUserSubs.js';
import './SubContainer.css'

function SubContainer(props) {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        let mounted = true;
        getUserSubs(props.userData.id)
            .then(userSubs => {
                setSubs(userSubs);
            })
            .catch(function (error) {
                console.log(error);
            });
        return () => {
            mounted = false;
        }
    }, [])

    return (
        <div className='subContainer'>
            <div className='subTitleBar'>
                <div className='subContainerTitle'>Your Subscriptions</div>
                <SubUpdater setSubs={setSubs} userId={props.userData.id} />
            </div>
            <SubCarousel subs={subs} />
        </div>
    );

};
export default SubContainer;