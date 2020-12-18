import React, { Component } from 'react';
import Auth from '../components/Auth';
import { getMostPopular, filterMostPopular } from '../helpers/data/showData';
import ShowCard from '../components/Cards/ShowCard';
import SearchInput from '../components/SearchInput';

export default class Home extends Component {
  state = {
    shows: [],
    network: '',
  }

  componentDidMount() {
    this.loadShows();
  }

  loadSignIn = () => {
    const { user } = this.props;
    let component = '';
    if (!user) {
      component = <Auth/>;
    }
    return component;
  }

  loadShows = () => {
    getMostPopular().then((response) => {
      this.setState({
        shows: response,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.network === 'All Shows') {
      this.loadShows();
    } else {
      filterMostPopular(this.state.network).then((response) => {
        this.setState({ shows: response });
      });
    }
  };

  render() {
    const { shows } = this.state;
    const renderShows = () => (
      shows.map((show) => <ShowCard key={show.id} show={show} />)
    );
    return (
      <div>
        <h1 className='d-flex justify-content-center mt-3'>Welcome To Know The Network!</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {this.loadSignIn()}
        </div>
        <div className='search-container'>
          <SearchInput />
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={this.handleSubmit} className="network-filter-form">
            <div className='form-group'>
                  <label>Filter By Network</label>
                  <select
                    className='form-control'
                    id='network'
                    name='network'
                    value={this.state.network}
                    onChange={this.handleChange}
                  >
                    <option>All Shows</option>
                    <option>AMC</option>
                    <option>ABC</option>
                    <option>CBS All Access</option>
                    <option>Comedy Central</option>
                    <option>Cartoon Network</option>
                    <option>Disney+</option>
                    <option>Fox</option>
                    <option>FX</option>
                    <option>HBO</option>
                    <option>HBO Max</option>
                    <option>History</option>
                    <option>Hulu</option>
                    <option>MTV</option>
                    <option>NBC</option>
                    <option>Netflix</option>
                    <option>Syfy</option>
                    <option>Showtime</option>
                    <option>Starz</option>
                    <option>The CW</option>
                  </select>
            </div>
            <button className="form-btn btn btn-outline-primary">
                Submit
            </button>
          </form>
        </div>
        <div className='d-flex flex-wrap justify-content-center container'>{renderShows()}</div>
      </div>
    );
  }
}
