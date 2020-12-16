import React, { Component } from 'react';
import { getSingleShow } from '../helpers/data/showData';
import {
  createUserShowsWatchlist,
  createUserShowsFavorites,
  getReviews,
} from '../helpers/data/userShowsData';
import getUid from '../helpers/data/authData';
import ReviewCard from '../components/Cards/ReviewCard';

export default class SingleShow extends Component {
  state = {
    show: {},
    network: [],
    reviews: [],
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
          network: response.network,
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
          reviews: response,
        });
      });
  }

  render() {
    const {
      show,
      network,
      reviews,
      userId,
    } = this.state;
    const renderReviews = () => (
      reviews.map((review) => <ReviewCard key={review.firebaseKey} review={review}/>)
    );
    const mapNetworks = network.map((item) => item.name);
    return (
        <div className='d-flex flex-wrap justify-content-center container'>
          <div className='card m-5'>
            <img className='card-img-top-single' src={show.image_thumbnail_path} alt='show Img' />
          <div className='card-body-single'>
            <h3 className='card-title-single'>{show.name}</h3>
              <h5>Network: {mapNetworks}</h5>
              <h5>Country: {show.country}</h5>
              <h5>Airing: {show.status}</h5>
              {userId && (
                <div className='button-container-board d-flex justify-content-center'>
                  <button className='btn btn-secondary watchlist-button' onClick={this.addToWatchlist}>Add To WatchList</button>
                  <button className='btn btn-secondary favorites-button' onClick={this.addToFavorites}>Add To Favorites</button>
                </div>
              )}
            <div>
              <h2>Reviews</h2>
              <div>{renderReviews()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
