import React, { useState, useEffect } from 'react';

function Category(props) {

    const handleClick = (e) => {
        let categoryInfo = {
            category: props.category,
            categoryId: props.categoryId
        }
        props.setSelectedCategory(categoryInfo)
    }
 
    return (
        <div className='category' onClick={handleClick}>{props.category}</div>
    )

}
export default Category;