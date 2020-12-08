import React, { Component } from 'react';
import { getUserShows } from '../helpers/data/userShowsData';
import { getSingleShow } from '../helpers/data/showData';
import getUid from '../helpers/data/authData';
import FavoritesCard from '../components/Cards/FavoritesCard';

export default class Favorites extends Component {
  state = {
    shows: [],
  }

  componentDidMount() {
    const userId = getUid();
    this.setState({ userId });
    this.loadUserShows(userId)
      .then((response) => (
        this.setState({ shows: response })
      ));
  }

  loadUserShows = (userId) => (
    getUserShows(userId).then((response) => {
      const showArray = [];
      response.forEach((item) => {
        if (item.favorites) {
          showArray.push(getSingleShow(item.showId));
        }
      });
      return Promise.all([...showArray]);
    })
  )

  render() {
    const { shows } = this.state;
    const renderShows = () => (
      shows.map((show) => <FavoritesCard key={show.id} show={show} />)
    );
    return (
      <div>
        <h1>Favorite Shows You've Watched</h1>
        <div className='d-flex flex-wrap container'>{renderShows()}</div>
      </div>
    );
  }
}
