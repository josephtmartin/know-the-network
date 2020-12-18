import React, { Component } from 'react';
import { getUserShows, deleteShow } from '../helpers/data/userShowsData';
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

  removeFavorite = (e) => {
    deleteShow(e.target.id)
      .then(() => {
        const userId = getUid();
        setTimeout(() => {
          this.loadUserShows(userId)
            .then((response) => {
              this.setState({ shows: response });
            });
        }, 500);
      });
  }

  render() {
    const { shows } = this.state;
    const renderShows = () => (
      shows.map((show) => <FavoritesCard key={show.id} show={show} removeFavorite={this.removeFavorite} onUpdate={this.loadUserShows}/>)
    );
    return (
      <div>
        <h1 className='mt-3'>Favorite Shows You've Watched</h1>
        <div className='d-flex flex-wrap justify-content-center container'>{renderShows()}</div>
      </div>
    );
  }
}
