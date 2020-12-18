import React, { Component } from 'react';
import { getUserShows, deleteShow, wasFavorited } from '../helpers/data/userShowsData';
import { getSingleShow } from '../helpers/data/showData';
import getUid from '../helpers/data/authData';
import WatchlistCard from '../components/Cards/WatchlistCard';

export default class SingleShow extends Component {
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
        if (item.watchlist && !item.watched) {
          showArray.push(getSingleShow(item.showId));
        }
      });
      return Promise.all([...showArray]);
    })
  )

  watched = (e) => {
    deleteShow(e.target.id)
      .then(() => {
        const userId = getUid();
        setTimeout(() => {
          this.loadUserShows(userId).then((response) => {
            this.setState({ shows: response });
          });
        }, 500);
      });
  }

  favorited = (e) => {
    wasFavorited(e.target.id)
      .then(() => {
        const userId = getUid();
        setTimeout(() => {
          this.loadUserShows(userId).then((response) => {
            this.setState({ shows: response });
          });
        }, 500);
      });
  }

  render() {
    const { shows } = this.state;
    const renderShows = () => (
      shows.map((show) => <WatchlistCard key={show.id} show={show} wasWatched={this.watched} wasFavorited={this.favorited} />)
    );
    return (
      <div>
        <h1 className='mt-3'>Shows To Watch</h1>
        <div className='d-flex flex-wrap justify-content-center container'>{renderShows()}</div>
      </div>
    );
  }
}
