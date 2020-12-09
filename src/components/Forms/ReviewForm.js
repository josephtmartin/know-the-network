import React, { Component } from 'react';
import getUser from '../../helpers/data/authData';
import { addReview, getUserShows, updateReview } from '../../helpers/data/userShowsData';

export default class ReviewForm extends Component {
  state = {
    firebaseKey: '',
    showId: this.props.showId,
    description: '',
    rating: '',
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
    this.loadUserShows(userId);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.firebaseKey === '') {
      addReview(this.state)
        .then(() => {
          this.props.onUpdate();
        });
    } else {
      // updateReview(this.state)
      //   .then(() => {
      //     this.props.onUpdate(this.state.firebaseKey);
      //   });
    }
  }

  loadUserShows = (userId) => {
    getUserShows(userId).then((response) => {
      this.setState({ firebaseKey: response[0].firebaseKey });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Leave A Review</h1>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Show Description'
          className='form-control form-control-lg m-1'
          required
          />
          <input
          type='number'
          name='rating'
          min='1'
          max='10'
          value={this.state.rating}
          onChange={this.handleChange}
          placeholder='Show Rating 1-10'
          className='form-control form-control-lg m-1'
          required
          />
          <button>Submit</button>
      </form>
    );
  }
}
