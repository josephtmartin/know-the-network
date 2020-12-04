import React from 'react';
import firebase from 'firebase/app';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import setCurrentUser from '../helpers/data/userData';

import Navbar from '../components/Navbar';
import Routes from '../helpers/Routes';

fbConnection();
export default class App extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUser = setCurrentUser(user);
        this.setState({ user: currentUser });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar user={user}/>
          <Routes user={user}/>
        </Router>
      </div>
    );
  }
}
