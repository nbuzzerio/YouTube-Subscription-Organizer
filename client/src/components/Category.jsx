import React, { useState, useEffect } from 'react';
import postChannelToCategory from './_postChannelToCategory.js';

function Category(props) {

    const drop = (e) => {
        e.preventDefault();
        const channel_id = e.dataTransfer.getData('channel_id');
        console.log('drop Successful:', channel_id)

        postChannelToCategory(channel_id, props.userId);
        
    }

    const dragOver = (e) => {
        e.preventDefault();
        console.log('dragOver Successful')
    }

    const handleClick = (e) => {
        let categoryInfo = {
            category: props.category,
            categoryId: props.categoryId
        }
        props.setSelectedCategory(categoryInfo)
    }
 
    return (
        <div className='category' onClick={handleClick} onDrop={drop} onDragOver={dragOver}>{props.category}</div>
    )

}
export default Category;