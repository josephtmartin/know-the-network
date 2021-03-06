import axios from 'axios';

const baseUrl = 'https://know-the-network-default-rtdb.firebaseio.com';

const createUserShowsWatchlist = (showId, userId) => {
  axios.post(`${baseUrl}/user-shows.json`, {
    showId,
    userId,
    watched: false,
    watchlist: true,
    favorites: false,
  })
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/user-shows/${response.data.name}.json`, update)
        .catch((error) => console.warn(error));
    });
};

const createUserShowsFavorites = (showId, userId) => {
  axios.post(`${baseUrl}/user-shows.json`, {
    showId,
    userId,
    watched: true,
    watchlist: false,
    favorites: true,
  })
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/user-shows/${response.data.name}.json`, update)
        .catch((error) => console.warn(error));
    });
};

const getUserShows = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="userId"&equalTo="${userId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

const deleteShow = (showId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="showId"&equalTo=${showId}`).then((response) => {
    const firebaseKey = Object.keys(response.data)[0];
    axios.delete(`${baseUrl}/user-shows/${firebaseKey}.json`);
  })
    .then(resolve).catch((error) => reject(error));
});

const wasFavorited = (showId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="showId"&equalTo=${showId}`).then((response) => {
    const firebaseKey = Object.keys(response.data)[0];
    axios.patch(`${baseUrl}/user-shows/${firebaseKey}.json`, { favorites: true, watched: true, watchlist: false });
  })
    .then(resolve).catch((error) => reject(error));
});

const addReview = (reviewObj) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="firebaseKey"&equalTo="${reviewObj.firebaseKey}"`).then((response) => {
    const joinTable = (Object.values(response.data)[0]);
    axios.patch(`${baseUrl}/user-shows/${joinTable.firebaseKey}.json`, reviewObj);
  })
    .then(resolve).catch((error) => reject(error));
});

const getJoinTable = (showId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="showId"&equalTo=${showId}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getReviews = (showId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="showId"&equalTo=${showId}`).then((response) => {
    const reviews = Object.values(response.data);
    const reviewArray = [];
    reviews.forEach((review) => {
      if (review.description && review.rating) {
        reviewArray.push(review);
      }
    });
    resolve(reviewArray);
  }).catch((error) => reject(error));
});

export {
  createUserShowsWatchlist,
  createUserShowsFavorites,
  getUserShows,
  deleteShow,
  wasFavorited,
  addReview,
  getJoinTable,
  getReviews,
};
