import React, { useState, useEffect } from 'react';
import VideoList from '../components/VideoList.jsx';
import CategorySubs from '../components/CategorySubs.jsx';
import getCategorySubscriptions from '../components/_getCategorySubscriptions.js';
// import './ChosenCategoryContainer.css';

function ChosenCategoryContainer({ categoryInfo, userId , setSelectedCategory}) {

    const [categorySubs, setCategorySubs] = useState([]);

    const handleClick = () => {
        setSelectedCategory(null)
    };

console.log(categoryInfo)

    useEffect(() => {
        let mounted = true;
        getCategorySubscriptions(userId, categoryInfo.categoryId)
            .then(categorySubs => {
                if (mounted) {
                    console.log('categorySubs:', categorySubs)
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
        <div className='choseCategoryContainer'>
            <h3>Chosen Category {categoryInfo.category}</h3>
            <button onClick={handleClick}>Choose Another Category</button>
            <CategorySubs categoryId={categoryInfo.categoryId} categorySubs={categorySubs} />
            <VideoList />
        </div>
    )

}
export default ChosenCategoryContainer;