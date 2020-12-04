import axios from 'axios';

const baseUrl = 'https://know-the-network-default-rtdb.firebaseio.com';

const checkIfUserExistsInFirebase = (user) => {
  axios
    .get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((resp) => {
      if (Object.values(resp.data).length === 0) {
        axios.post(`${baseUrl}/users.json`, user).then((response) => {
          const update = { firebaseKey: response.data.name };
          axios.patch(`${baseUrl}/users/${response.data.name}.json`, update);
        }).catch((error) => console.warn(error));
      } else {
        console.warn('User Already Exists');
      }
    })
    .catch((error) => console.error(error));
};

const setCurrentUser = (userObj) => {
  const user = {
    image: userObj.photoURL,
    uid: userObj.uid,
    name: userObj.displayName,
    email: userObj.email,
    lastSignInTime: userObj.metadata.lastSignInTime,
  };
  checkIfUserExistsInFirebase(user);
  return user;
};

export default setCurrentUser;
