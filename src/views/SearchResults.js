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

  render() {
    const { results } = this.state;
    const showResults = () => (
      results.map((result) => (
        <ShowCard key={result.id} show={result} />
      ))
    );

    return (
      <div>
        <h1 className='d-flex justify-content-center'>Search Results</h1>
        <div className='d-flex flex-wrap justify-content-center container'>
          {showResults()}
        </div>
      </div>
    );
  }
}
