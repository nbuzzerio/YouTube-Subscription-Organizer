import React, { useState, useEffect } from 'react';
import postNewCategory from '../components/_postNewCategory.js';


function CategoryInput(props) {

  const [text, setText] = useState('');
  const [validInput, setValidInput] = useState(true);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    setText('');
    if (!validInput) {
      setValidInput(true);
    }
    //check if we already have that category
    let categories = props.categoryData
    for (var i = 0; i < categories.length; i++) {
      if (text === categories[i].Category_Name) {
        setValidInput(false);
      }
    }

    let mounted = true;
    postNewCategory(text, props.userId)
      .then(userCategories => {
        if (mounted) {
          props.setCategoryData(userCategories.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    return () => {
      mounted = false;
    }
  }

  let inputError;
  if (!validInput) {
    inputError = <p style={{ color: "#D00000" }}>You already have that category!</p>
  }

  return (
    <form onSubmit={handleCreate}>
      <label>
        New Category:
            <input type="text" value={text} onChange={handleChange} />
      </label>
      {inputError}
      <input type="submit" value="Submit" />
    </form>
  );

}
export default CategoryInput;