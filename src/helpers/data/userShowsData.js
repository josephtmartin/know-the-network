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

const createUserShowsFavorites = (showId, userId) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/user-shows.json`, {
    showId,
    userId,
    favorites: true,
  }).catch((error) => reject(error));
});

const getUserShows = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-shows.json?orderBy="userId"&equalTo="${userId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

const wasWatched = (showId) => new Promise((resolve, reject) => {
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

export {
  createUserShowsWatchlist,
  createUserShowsFavorites,
  getUserShows,
  wasWatched,
  wasFavorited,
};
