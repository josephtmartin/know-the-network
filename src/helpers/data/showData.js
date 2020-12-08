import axios from 'axios';

const baseUrl = 'https://www.episodate.com/api';

const getMostPopular = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/most-popular?page=1`)
    .then((response) => {
      resolve(response.data.tv_shows);
    }).catch((error) => reject(error));
});

const searchShows = (term) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/search?q=${term}`)
    .then((response) => {
      resolve(response.data.tv_shows);
    }).catch((error) => reject(error));
});

const getSingleShow = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/show-details?q=${id}`)
    .then((response) => {
      resolve(response.data.tvShow);
    }).catch((error) => reject(error));
});

export { getMostPopular, searchShows, getSingleShow };
