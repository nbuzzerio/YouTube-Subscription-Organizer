import React, { useState, useEffect } from 'react';
import Sub from './Sub.jsx';

function CategorySubs({categorySubs}) {
    
    let listsubs = categorySubs.map((sub, i) => <Sub sub={sub} key={i} />);

    return (
        <div className='categorySubs'>
            <h4>Category Subscriptions</h4>
            {listsubs}
        </div>
    )

}
export default CategorySubs;