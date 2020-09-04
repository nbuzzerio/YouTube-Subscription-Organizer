import axios from 'axios';

const getGoogleUserInfo = async () => {
    return await axios({
      method: 'get',
      url: '/googleUserInfo'
    })
    .then( res => res)
    .catch( err => {throw err})
};

export default getGoogleUserInfo;