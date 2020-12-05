import axios from 'axios';

const baseUrl = 'https://www.episodate.com/api';

const getMostPopular = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/most-popular?page=1`)
    .then((response) => {
      resolve(response.data.tv_shows);
    }).catch((error) => reject(error));
});

export default { getMostPopular };
