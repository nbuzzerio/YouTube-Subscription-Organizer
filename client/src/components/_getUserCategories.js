import axios from 'axios';

const getUserCategories = async (userId) => {
  return await axios({
    method: 'get',
    url: '/getUserCategories',
    params: {
      user: userId 
    }
  })
    .then(res => res.data)
    .catch(err => { throw err })
};

export default getUserCategories;