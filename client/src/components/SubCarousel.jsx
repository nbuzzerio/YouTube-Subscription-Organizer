import React, { useState, useEffect } from 'react';
import SubFilter from './SubFilter.jsx';
import Sub from './Sub.jsx';

function SubCarousel(props) {
    
   let subs = props.subs;
   let listsubs = subs.map((sub, i) => <Sub sub={sub} key={i}/>);

    return (
        <div>
            <h4>SubCarousel PlaceHolder</h4>
            <SubFilter />
            {listsubs}

        </div>
    );

};
export default SubCarousel;