import React, { useState, useEffect } from 'react';
import SubUpdater from '../components/SubUpdater.jsx';
import SubCarousel from '../components/SubCarousel.jsx';


function SubContainer(props) {
    const [subs, setSubs] = useState([]);

    return (
        <div>
            <h3>SubContainer PlaceHolder</h3>
            <SubUpdater setSubs={setSubs} userId={props.userData.id}/>
            <SubCarousel subs={subs}/>
        </div>
    );

};
export default SubContainer;