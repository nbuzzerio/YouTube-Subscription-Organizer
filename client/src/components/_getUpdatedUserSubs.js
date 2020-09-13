import axios from 'axios';

const getUpdatedUserSubs = async (userId) => {
  return await axios({
    method: 'get',
    url: '/updateSubs',
    params: {
      user: userId
    }
  })
    .then(res => res.data.subscriptions)
    .catch(err => { throw err });
};

export default getUpdatedUserSubs;