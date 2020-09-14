import React, { useState, useEffect } from 'react';
import SubFilter from './SubFilter.jsx';
import Sub from './Sub.jsx';

function SubCarousel({ subs }) {
    const [filter, setFilter] = useState('');

    let filteredList = [];

    if (subs.length > 0) {
        filteredList = subs.filter(sub => sub.Channel_Name.toLowerCase().includes(filter.toLowerCase()) || sub.Channel_Description.toLowerCase().includes(filter.toLowerCase()));
    }
    
    let listsubs = filteredList.map((sub, i) => <Sub sub={sub} key={i} />);

    return (
        <div>
            <h4>SubCarousel PlaceHolder</h4>
            <SubFilter setFilter={setFilter} />
            {listsubs}
        </div>
    );
};
export default SubCarousel;