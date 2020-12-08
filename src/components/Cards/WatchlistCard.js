import React from 'react';

export default function WatchlistCard({ show }) {
  return (
        <div className='card m-2'>
          <div className='card-image-container'>
              <img className='card-img-top' src={show.image_thumbnail_path} alt='Board Img' />
          </div>
          <div className='card-body'>
            <h3 className='card-title'>{show.name}</h3>
              <h5>Network: {show.network}</h5>
              <h5>Country: {show.country}</h5>
              <h5>Airing: {show.status}</h5>
              <div className='button-container'>
                <button className='btn btn-secondary watched'>Watched</button>
              </div>
          </div>
        </div>
  );
}
