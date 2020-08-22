import axios from 'axios';

const getGoogleSignIn = () => {
    return axios({
      method: 'get',
      url: '/googleAuth',
    })
    .then( res => res.data)
    .catch( err => {throw err})
};

export default getGoogleSignIn;