import axios from 'axios';

const getGoogleSignIn = async () => {
    return await axios({
      method: 'get',
      url: `${window.location.href}/googleAuth`,
    })
    .then( res => res.data)
    .catch( err => {throw err})
};

export default getGoogleSignIn;