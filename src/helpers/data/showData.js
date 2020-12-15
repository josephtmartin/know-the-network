import axios from 'axios';

// const baseUrl = 'https://www.episodate.com/api';
// const baseUrl = 'https://know-the-network-default-rtdb.firebaseio.com';

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

const getMostPopular = () => new Promise((resolve, reject) => {
  axios.get('https://api.themoviedb.org/3/tv/popular?api_key=bc5d1ec46ecdeb9e460eca0c17a03791&language=en-US&page=1')
    .then((response) => {
      const data = response.data.results;
      const showsArray = data.map((show) => (
        axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=bc5d1ec46ecdeb9e460eca0c17a03791&language=en-US`)
          .then((singleResponse) => {
            const showDetails = singleResponse.data;
            const showObj = {
              id: showDetails.id,
              name: showDetails.name,
              image_thumbnail_path: `https://image.tmdb.org/t/p/w220_and_h330_face${showDetails.backdrop_path}`,
              network: showDetails.networks,
              country: showDetails.origin_country,
              status: showDetails.status,
            };
            return showObj;
          })
      ));
      resolve(Promise.all([...showsArray]));
    }).catch((error) => reject(error));
});

const getSingleShow = (id) => new Promise((resolve, reject) => {
  axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=bc5d1ec46ecdeb9e460eca0c17a03791&language=en-US`)
    .then((response) => {
      const responseObj = response.data;
      const showObj = {
        id: responseObj.id,
        name: responseObj.name,
        image_thumbnail_path: `https://image.tmdb.org/t/p/w220_and_h330_face${responseObj.backdrop_path}`,
        network: responseObj.networks,
        country: responseObj.origin_country,
        status: responseObj.status,
      };
      resolve(showObj);
    }).catch((error) => reject(error));
});

const searchShows = () => console.warn('nothing');

const filterMostPopular = () => console.warn('nothing');

export {
  getMostPopular,
  searchShows,
  getSingleShow,
  filterMostPopular,
};
