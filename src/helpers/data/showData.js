import axios from 'axios';

// const baseUrl = 'https://www.episodate.com/api';
// const baseUrl = 'https://know-the-network-default-rtdb.firebaseio.com';
const baseUrl

// const getMostPopular = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/most-popular?page=1`)
//     .then((response) => {
//       resolve(response.data.tv_shows);
//     }).catch((error) => reject(error));
// });

// const searchShows = (term) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/search?q=${term}`)
//     .then((response) => {
//       resolve(response.data.tv_shows);
//     }).catch((error) => reject(error));
// });

// const getSingleShow = (id) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/show-details?q=${id}`)
//     .then((response) => {
//       resolve(response.data.tvShow);
//     }).catch((error) => reject(error));
// });

// const filterMostPopular = (term) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/most-popular?page=1`)
//     .then((response) => {
//       const shows = response.data.tv_shows;
//       const showArray = [];
//       shows.forEach((item) => {
//         if (item.network === term) {
//           showArray.push(item);
//         }
//       });
//       resolve(showArray);
//     }).catch((error) => reject(error));
// });

// const getMostPopular = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/shows.json`)
//     .then((response) => {
//       resolve(Object.values(response.data));
//     }).catch((error) => reject(error));
// });

// const getSingleShow = (id) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/shows.json?orderBy="id"&equalTo=${id}`)
//     .then((response) => {
//       resolve(Object.values(response.data)[0]);
//     }).catch((error) => reject(error));
// });

// const searchShows = () => console.warn('Search not working API broke');

export {
  getMostPopular,
  searchShows,
  getSingleShow,
  filterMostPopular,
};
