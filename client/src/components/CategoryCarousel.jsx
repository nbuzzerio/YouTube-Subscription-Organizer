import React, { useState, useEffect } from 'react';
import Category from '../components/Category.jsx';

function CategoryCarousel(props) {
  let categories = props.categoryData;
  let listCategories = categories.map((category, i) => <Category category={category.Category_Name} categoryId = {category.Category_Id} setSelectedCategory={props.setSelectedCategory} key={i}/>);

    return (
        <div>
            <h4 className='selectMsg' >Select A Category:</h4>
            <div className='categoryCarousel'>
                {listCategories}
            </div>
        </div>
    )

}
export default CategoryCarousel;