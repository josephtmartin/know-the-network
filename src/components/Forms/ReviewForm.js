import React, { Component } from 'react';
import getUser from '../../helpers/data/authData';
import { addReview, getJoinTable } from '../../helpers/data/userShowsData';

export default class ReviewForm extends Component {
  state = {
    showId: this.props.showId,
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
    this.getJoinTableFirebaseKey(this.state.showId);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    addReview(this.state)
      .then(() => {
        this.props.onUpdate();
      });
  }

  getJoinTableFirebaseKey = (showId) => {
    getJoinTable(showId).then((response) => {
      response.forEach((item) => {
        const userId = getUser();
        if (item.userId === userId) {
          this.setState({
            firebaseKey: item.firebaseKey,
            description: item.description,
            rating: item.rating,
          });
        }
      });
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
