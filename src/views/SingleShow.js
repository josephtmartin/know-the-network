import React, { Component } from 'react';
import { getSingleShow } from '../helpers/data/showData';
import { createUserShowsWatchlist, createUserShowsFavorites, getReviews } from '../helpers/data/userShowsData';
import getUid from '../helpers/data/authData';

export default class SingleShow extends Component {
  state = {
    show: {},
    review: {},
  }

  componentDidMount() {
    const showId = this.props.match.params.id;
    this.getShow(showId);
    const userId = getUid();
    this.setState({ userId });
    this.loadReviews(showId);
  }

  getShow = (showId) => {
    getSingleShow(showId)
      .then((response) => {
        this.setState({
          show: response,
        });
      });
  }

  addToWatchlist = () => {
    const { show, userId } = this.state;
    const showId = show.id;
    createUserShowsWatchlist(showId, userId);
  }

  addToFavorites = () => {
    const { show, userId } = this.state;
    const showId = show.id;
    createUserShowsFavorites(showId, userId);
  }

  loadReviews = (showId) => {
    getReviews(showId)
      .then((response) => {
        this.setState({
          review: response,
        });
      });
  }

  render() {
    const { show, review } = this.state;
    return (
      <>
        <div className='d-flex flex-wrap justify-content-center container'>
          <div className='card m-2'>
          <img className='card-img-top' src={show.image_thumbnail_path} alt='show Img' />
          <div className='card-body'>
            <h3 className='card-title'>{show.name}</h3>
              <h5>Network: {show.network}</h5>
              <h5>Country: {show.country}</h5>
              <h5>Airing: {show.status}</h5>
            <div className='button-container-board d-flex justify-content-center'>
              <button className='btn btn-secondary watchlist-button' onClick={this.addToWatchlist}>Add To WatchList</button>
              <button className='btn btn-secondary favorites-button' onClick={this.addToFavorites}>Add To Favorites</button>
            </div>
            {/* <div>
              <h3>{review.description}</h3>
              <h3>{review.rating}</h3>
            </div> */}
          </div>
        </div>
      </div>
    </>
    );
  }
}
