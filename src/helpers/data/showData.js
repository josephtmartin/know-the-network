import axios from 'axios';

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

const searchShows = (term) => new Promise((resolve, reject) => {
  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=bc5d1ec46ecdeb9e460eca0c17a03791&language=en-US&query=${term}`)
    .then((response) => {
      const data = response.data.results;
      const checkImage = (image) => {
        let imageUrl = image;
        if (imageUrl === 'https://image.tmdb.org/t/p/w220_and_h330_facenull') {
          imageUrl = 'https://www.bearcatscanner.com/images/detailed/1/no_image_sm_vjbo-hm.png';
        }
        return imageUrl;
      };
      const showsArray = data.map((show) => (
        axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=bc5d1ec46ecdeb9e460eca0c17a03791&language=en-US`)
          .then((singleResponse) => {
            const showDetails = singleResponse.data;
            const showObj = {
              id: showDetails.id,
              name: showDetails.name,
              image_thumbnail_path: checkImage(`https://image.tmdb.org/t/p/w220_and_h330_face${showDetails.backdrop_path}`),
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

const filterMostPopular = (term) => new Promise((resolve, reject) => {
  getMostPopular().then((response) => {
    const shows = response;
    const showArray = [];
    shows.forEach((show) => {
      show.network.forEach((item) => {
        if (item.name === term) {
          showArray.push(show);
        }
      });
    });
    resolve(showArray);
  }).catch((error) => reject(error));
});

export {
  getMostPopular,
  searchShows,
  getSingleShow,
  filterMostPopular,
};
