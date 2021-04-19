import axios from 'axios';

const getUpdatedUserSubs = async (userId) => {
  return await axios({
    method: 'get',
    url: `${window.location.href}/updateSubs`,
    params: {
      user: userId
    }
  })
    .then(res => res.data)
    .catch(err => { throw err });
};

export default getUpdatedUserSubs;