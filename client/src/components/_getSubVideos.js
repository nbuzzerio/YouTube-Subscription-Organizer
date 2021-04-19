import axios from 'axios';

const getSubVideos = async (channelIds) => {
  return await axios({
    method: 'get',
    url: `${window.location.href}/getSubVideos`,
    params: {
      channelIds: channelIds
    }
  })
    .then(res => res.data)
    .catch(err => { throw err })
};

export default getSubVideos;