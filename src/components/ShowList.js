import React, { useEffect, useState } from 'react';
import { fetchShowsByGenre } from '../api';

const ShowList = ({ genre, onFetchShows }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      const fetchedShows = await fetchShowsByGenre(genre);
      setShows(fetchedShows);
      onFetchShows(fetchedShows);
    };
    getShows();
  }, [genre, onFetchShows]);

  return (
    <div className="show-list">
      <h2>Top Rated Shows in Selected Genre</h2>
      <div className="show-grid">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
            <h3>{show.name}</h3>
            <p>Rating: {show.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
