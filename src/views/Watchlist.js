import React, { Component } from 'react';
import { getUserShows } from '../helpers/data/userShowsData';
import { getSingleShow } from '../helpers/data/showData';
import getUid from '../helpers/data/authData';
import ShowCard from '../components/Cards/ShowCard';

export default class Watchlist extends Component {
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
        if (item.watchlist) {
          showArray.push(getSingleShow(item.showId));
        }
      });
      return Promise.all([...showArray]);
    })
  )

  render() {
    const { shows } = this.state;
    const renderShows = () => (
      shows.map((show) => <ShowCard key={show.id} show={show} />)
    );
    return (
      <div>
        <h1>Watchlist Component</h1>
        <div className='d-flex flex-wrap container'>{renderShows()}</div>
      </div>
    );
  }
}
