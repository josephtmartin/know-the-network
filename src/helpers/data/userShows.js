import axios from 'axios';

const baseUrl = 'https://know-the-network-default-rtdb.firebaseio.com';

const createUserShows = (showId, userId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/user-shows.json`, {
    showId,
    userId,
  }).catch((error) => reject(error));
});

export default createUserShows;
