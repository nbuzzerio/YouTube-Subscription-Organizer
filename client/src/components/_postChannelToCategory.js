import axios from 'axios';

const postChannelToCategory = async (addedChannel, categoryId) => {
  return await axios({
    method: 'post',
    url: `${window.location.href}/postChannelToCategory`,
    data: {
      addedChannel: addedChannel,
      categoryId: categoryId
    }
  })
    .then(res => res)
    .catch(err => { throw err })
};

export default postChannelToCategory;