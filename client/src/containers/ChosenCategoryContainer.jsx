import React, { useState, useEffect } from 'react';
import VideoList from '../components/VideoList.jsx';
import CategorySubs from '../components/CategorySubs.jsx';
import getCategorySubscriptions from '../components/_getCategorySubscriptions.js';
import './ChosenCategoryContainer.css';

function ChosenCategoryContainer({ categoryInfo, userId , setSelectedCategory}) {

    const [categorySubs, setCategorySubs] = useState([]);

    const handleClick = () => {
        setSelectedCategory(null)
    };

    useEffect(() => {
        let mounted = true;
        getCategorySubscriptions(userId, categoryInfo.categoryId)
            .then(categorySubs => {
                if (mounted) {
                    setCategorySubs(categorySubs);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        return () => {
            mounted = false;
        }
    }, [])

    return (
        <div class='chosenWrapper'>
            <div className='chosenCategoryTitle'>{categoryInfo.category + ' Subs'}</div>
            <button className='clearCategoryBtn' onClick={handleClick}>Choose Another Category</button>
            <div className='chosenCategoryContainer'>
                <CategorySubs categoryId={categoryInfo.categoryId} categorySubs={categorySubs} />
                <VideoList categorySubs={categorySubs} />
            </div>
        </div>
    )

}
export default ChosenCategoryContainer;