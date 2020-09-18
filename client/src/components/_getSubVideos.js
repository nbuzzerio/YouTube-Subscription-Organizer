import axios from 'axios';

const getSubVideos = async (channelIds) => {
  return await axios({
    method: 'get',
    url: '/getSubVideos',
    params: {
      channelIds: channelIds
    }
  })
    .then(res => res.data)
    .catch(err => { throw err })
};

export default getSubVideos;