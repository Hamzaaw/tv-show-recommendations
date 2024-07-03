import React, { useState, useEffect } from 'react';
import './App.css';
import GenreSelection from './components/GenreSelection';
import { fetchShowsByGenre, fetchShowDetails } from './api';
import editorsChoiceShows from './editorsChoiceShows';
import { Analytics } from '@vercel/analytics/react';

const buttonTexts = [
  "this ain't it chief",
  'Hard pass',
  'Missed the vibe',
  "That's cap",
  'Nah, fam',
  'Major L',
  'Swing and a miss',
  'Not in a million years',
  'My answer is a resounding nope',
  "Nah, I'm good",
  'give another one'
];

const App = () => {
  const [genre, setGenre] = useState('');
  const [shows, setShows] = useState([]);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [buttonText, setButtonText] = useState(buttonTexts[0]);
  const [loading, setLoading] = useState(false);

  const handleGenreSelect = async (selectedGenre) => {
    setGenre(selectedGenre);
    setLoading(true);
    if (selectedGenre === 'editors-choice') {
      const showsWithDetails = await Promise.all(
        editorsChoiceShows.map(async (show) => {
          const details = await fetchShowDetails(show.name);
          return details
            ? { ...show, poster_path: details.poster_path, vote_average: details.vote_average }
            : show;
        })
      );
      setShows(showsWithDetails);
    } else {
      const fetchedShows = await fetchShowsByGenre(selectedGenre);
      shuffleArray(fetchedShows); // Shuffle the array to get varied recommendations
      setShows(fetchedShows);
    }
    setCurrentShowIndex(0);
    setLoading(false);
    setButtonText(getRandomButtonText()); // Set initial button text
  };

  const handleNextShow = () => {
    setCurrentShowIndex((prevIndex) => (prevIndex + 1) % shows.length);
    setButtonText(getRandomButtonText()); // Update button text
  };

  useEffect(() => {
    if (shows.length > 0) {
      setCurrentShowIndex(0);
    }
  }, [shows]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const getRandomButtonText = () => {
    return buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
  };

  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TV Show Recommendations</h1>
      </header>
      {!genre ? (
        <GenreSelection onSelectGenre={handleGenreSelect} />
      ) : (
        <div>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            shows.length > 0 && (
              <div className="recommendations">
                <h2>Recommended Show</h2>
                <div className="show-card">
                  <img src={`https://image.tmdb.org/t/p/w500${shows[currentShowIndex].poster_path}`} alt={shows[currentShowIndex].name} />
                  <h3>{shows[currentShowIndex].name}</h3>
                  <p>Rating: {shows[currentShowIndex].vote_average ? formatRating(shows[currentShowIndex].vote_average) : 'N/A'}</p>
                </div>
                <button onClick={handleNextShow}>{buttonText}</button>
              </div>
            )
          )}
        </div>
      )}
      <Analytics />
    </div>
  );
};

export default App;
