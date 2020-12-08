import React, { Component } from 'react';
import { getUserShows, wasWatched } from '../helpers/data/userShowsData';
import { getSingleShow } from '../helpers/data/showData';
import getUid from '../helpers/data/authData';
import WatchlistCard from '../components/Cards/WatchlistCard';

export default class SingleShow extends Component {
  state = {
    shows: [],
    userShows: [],
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
    wasWatched(e.target.id)
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
      shows.map((show) => <WatchlistCard key={show.id} show={show} wasWatched={this.watched} />)
    );
    return (
      <div>
        <h1>Watchlist</h1>
        <div className='d-flex flex-wrap container'>{renderShows()}</div>
      </div>
    );
  }
}
