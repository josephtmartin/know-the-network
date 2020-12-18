import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className='Auth'>
        <button className='btn nav-link btn-outline-primary m-2' onClick={this.loginClickEvent}>
          Login With Google To Create A Watchlist/Favorites Page
        </button>
      </div>
    );
  }
}
