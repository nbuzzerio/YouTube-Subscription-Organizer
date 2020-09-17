import axios from 'axios';

const getCategorySubscriptions = async (userId, categoryId) => {
  return await axios({
    method: 'get',
    url: '/getCategorySubs',
    params: {
      user: userId,
      categoryId: categoryId
    }
  })
    .then(res => res.data)
    .catch(err => { throw err });
};

export default getCategorySubscriptions;