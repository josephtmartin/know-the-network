import React, { Component } from 'react';
import Auth from '../components/Auth';

export default class Home extends Component {
  state = {

  }

  loadSignIn = () => {
    const { user } = this.props;
    let component = '';
    if (!user) {
      component = <Auth/>;
    }
    return component;
  }

  render() {
    return (
      <div>
        <h1 className='d-flex justify-content-center mt-3'>Home Component</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {this.loadSignIn()}
        </div>
      </div>
    );
  }
}
