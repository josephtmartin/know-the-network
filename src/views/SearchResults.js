import React, { Component } from 'react';
import ShowCard from '../components/Cards/ShowCard';
import { searchShows } from '../helpers/data/showData';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term.toLowerCase();
    this.getResults = searchShows(searchTerm)
      .then((results) => {
        this.setState({
          results,
          searchTerm,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.network === 'All Shows') {
      this.performSearch();
    } else {
      const showArray = [];
      this.state.results.forEach((show) => {
        show.network.forEach((item) => {
          if (item.name === this.state.network) {
            showArray.push(show);
          }
        });
      });
      this.setState({ results: showArray });
    }
  };

  render() {
    const { results } = this.state;
    const showResults = () => (
      results.map((result) => (
        <ShowCard key={result.id} show={result} />
      ))
    );

    return (
      <div>
        <h1 className='d-flex justify-content-center mt-3'>Search Results</h1>
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
            <button className="btn form-button form-button-text mt-1">
                Submit
            </button>
          </form>
        </div>
        <div className='d-flex flex-wrap justify-content-center container'>
          {showResults()}
        </div>
      </div>
    );
  }
}
