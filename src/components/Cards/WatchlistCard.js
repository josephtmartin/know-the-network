import React from 'react';

export default function WatchlistCard({ show, wasWatched, wasFavorited }) {
  const mapNetworks = show.network.map((item) => item.name);

  return (
        <div className='card m-2'>
          <div className='card-image-container'>
              <img className='card-img-top' src={show.image_thumbnail_path} alt='Board Img' />
          </div>
          <div className='card-body'>
            <h3 className='card-title'>{show.name}</h3>
              <h5>Network: {mapNetworks}</h5>
              <h5>Country: {show.country}</h5>
              <h5>Airing: {show.status}</h5>
              <div className='button-container'>
                <button className='btn btn-secondary watched m-2' id={show.id} onClick={(e) => wasWatched(e)}>Watched</button>
                <button className='btn btn-secondary favorite m-2' id={show.id} onClick={(e) => wasFavorited(e)}>Favorite</button>
              </div>
          </div>
        </div>
  );
}
