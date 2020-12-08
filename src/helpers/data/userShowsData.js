import axios from 'axios';

const baseUrl = 'https://know-the-network-default-rtdb.firebaseio.com';

const createUserShowsWatchlist = (showId, userId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/user-shows.json`, {
    showId,
    userId,
    watched: false,
    watchlist: true,
    favorites: false,
  }).catch((error) => reject(error));
});

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

export { createUserShowsWatchlist, createUserShowsFavorites, getUserShows };
