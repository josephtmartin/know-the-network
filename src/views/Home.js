import React, { Component } from 'react';
import Auth from '../components/Auth';
import showData from '../helpers/data/showData';
import ShowCard from '../components/Cards/ShowCard';
import SearchInput from '../components/SearchInput';

export default class Home extends Component {
  state = {
    shows: [],
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
    showData.getMostPopular().then((response) => {
      this.setState({
        shows: response,
      });
    });
  }

  render() {
    const { shows } = this.state;
    const renderShows = () => (
      shows.map((show) => <ShowCard key={show.id} show={show} />)
    );
    return (
      <div>
        <h1 className='d-flex justify-content-center mt-3'>Home Component</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {this.loadSignIn()}
        </div>
        <div className='search-container'>
          <SearchInput />
        </div>
        <div className='d-flex flex-wrap container'>{renderShows()}</div>
      </div>
    );
  }
}
