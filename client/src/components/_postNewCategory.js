import axios from 'axios';

const postNewCategory = async (newCategory, userId) => {
  return await axios({
    method: 'post',
    url: `${window.location.href}/postNewCategory`,
    data: {
      newCategory: newCategory,
      userId: userId
    }
  })
    .then(res => res)
    .catch(err => { throw err })
};

export default postNewCategory;