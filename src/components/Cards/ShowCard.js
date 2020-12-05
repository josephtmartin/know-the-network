import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowCard({ show }) {
  return (
        <div className='card m-2'>
          <img className='card-img-top' src={show.image_thumbnail_path} alt='Board Img' />
          <div className='card-body'>
            <h3 className='card-title'>{show.name}</h3>
              <h5>Network: {show.network}</h5>
              <h5>Country: {show.country}</h5>
              <h5>Airing: {show.status}</h5>
            <div className='button-container-board d-flex justify-content-center'>
              <Link className='btn btn-primary m-2' to={`/shows/${show.id}`}>
                View Show Details
              </Link>
            </div>
          </div>
        </div>
  );
}
