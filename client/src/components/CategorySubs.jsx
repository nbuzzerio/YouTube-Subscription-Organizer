import React, { useState, useEffect } from 'react';
import Sub from './Sub.jsx';

function CategorySubs({categorySubs}) {
    
    let listsubs = categorySubs.map((sub, i) => <Sub sub={sub} key={i} />);

    return (
        <div className='categorySubs'>
            <div className='categorySubsTitle'>Category Subscriptions</div>
            {listsubs}
        </div>
    )

}
export default CategorySubs;