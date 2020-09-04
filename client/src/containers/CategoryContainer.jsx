import React, { useState, useEffect } from 'react';
import CategoryInput from '../components/CategoryInput.jsx';
import CategoryCarousel from '../components/CategoryCarousel.jsx';
import getUserCategories from '../components/_getUserCategories.js';

function CategoryContainer(props) {

  const [categoryData, setCategoryData] = useState(null);
  useEffect(() => {
    let mounted = true;
    getUserCategories(props.userData.id)
      .then(userCategories => {
        if (mounted) {
          setCategoryData(userCategories);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    return () => {
      mounted = false;
    }
  }, [])
  let categoryMsg;
  if (categoryData) {
    categoryMsg = <div>
      <h3>Select a Category</h3>
      <CategoryInput setCategoryData={setCategoryData} />
      <CategoryCarousel nothing='nothing huh' setCategoryData={setCategoryData} categoryData={categoryData} setSelectedCategory={props.setSelectedCategory} />
    </div>
  } else {
    categoryMsg = <h3>Loading Categories...</h3>
  }

  return (
    <div>
      {categoryMsg}
    </div>
  )

}
export default CategoryContainer;