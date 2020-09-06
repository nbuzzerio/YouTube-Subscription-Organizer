import axios from 'axios';

const postNewCategory = async (newCategory, userId) => {
  console.log('inside ajax', newCategory, userId)
  return await axios({
    method: 'post',
    url: '/postNewCategory',
    data: {
      newCategory: newCategory,
      userId: userId
    }
  })
    .then(res => res)
    .catch(err => { throw err })
};

export default postNewCategory;