import axios from 'axios';

const getUserCategories = async (userData) => {
  return await axios({
    method: 'get',
    url: '/getUserCategories'
  })
    .then(res => res.data)
    .catch(err => { throw err })
};

export default getUserCategories;