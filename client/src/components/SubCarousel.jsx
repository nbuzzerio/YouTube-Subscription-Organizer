import React, { useState } from 'react';
import SubFilter from './SubFilter.jsx';
import Sub from './Sub.jsx';

function SubCarousel({ subs }) {
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1)

    let filteredList = [];
    let lastPage = Math.ceil(subs.length / 34);

    const handleClick = (e) => {
        
        if (e.target.innerText === '>') {
            if (page < lastPage) {
                setPage(page+1);
            }
        } else if (e.target.innerText === '<') {
            if (page > 1) {
                setPage(page-1);
            }
        }
    };

    if (subs.length > 0) {
        filteredList = subs.filter(sub => sub.Channel_Name.toLowerCase().includes(filter.toLowerCase()) || sub.Channel_Description.toLowerCase().includes(filter.toLowerCase()));
    }
    
    let listsubs = filteredList.map((sub, i) => <Sub sub={sub} key={i} />);

    let currentListSubs = listsubs.filter((sub, i) => i < (34 * page) && i >= (34 * page) - 34);

    return (
        <div className='subCarousel'>
            <div className='subsWrapper'>               
                <div className='pageBtn' id='back' onClick={handleClick}>
                    <p className='pageBtnTxt'>{'<'}</p>
                </div>
                <div className='pageBtn' id='next' onClick={handleClick}>
                    <p className='pageBtnTxt'>{'>'}</p>
                </div>
                {currentListSubs}
            </div>
            <SubFilter setFilter={setFilter} />
        </div>
    );
};
export default SubCarousel;