import axios from 'axios';

const getUserSubs = async (userId) => {
  return await axios({
    method: 'get',
    url: `${window.location.href}/getSubs`,
    params: {
      user: userId
    }
  })
    .then(res => res.data)
    .catch(err => { throw err });
};

export default getUserSubs;