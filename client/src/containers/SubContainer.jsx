import React, { useState, useEffect } from 'react';
import SubUpdater from '../components/SubUpdater.jsx';
import SubCarousel from '../components/SubCarousel.jsx';
import getUserSubs from '../components/_getUserSubs.js';

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
        <div>
            <h3>SubContainer PlaceHolder</h3>
            <SubUpdater setSubs={setSubs} userId={props.userData.id} />
            <SubCarousel subs={subs} />
        </div>
    );

};
export default SubContainer;