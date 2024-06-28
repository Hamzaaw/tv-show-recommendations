import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchShowDetails } from '../api';
import editorsChoiceShows from '../editorsChoiceShows';

const GenreSelection = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres([...fetchedGenres, { id: 'editors-choice', name: "Editor's Choice" }]);
    };

    const fetchEditorsChoiceDetails = async () => {
      const showsWithDetails = await Promise.all(
        editorsChoiceShows.map(async (show) => {
          const details = await fetchShowDetails(show.name);
          return details
            ? { ...show, poster_path: details.poster_path, vote_average: details.vote_average }
            : show;
        })
      );
      editorsChoiceShows.splice(0, editorsChoiceShows.length, ...showsWithDetails);
    };

    getGenres();
    fetchEditorsChoiceDetails();
  }, []);

  return (
    <div className="genre-selection">
      <h2>Select a Genre</h2>
      <div className="genre-grid">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`genre-box ${genre.id === 'editors-choice' ? 'editors-choice' : ''}`}
            onClick={() => onSelectGenre(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSelection;
