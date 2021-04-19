import axios from 'axios';

const getGoogleUserInfo = async () => {
    return await axios({
      method: 'get',
      url: `${window.location.href}/googleUserInfo`
    })
    .then( res => res)
    .catch( err => {throw err})
};

export default getGoogleUserInfo;