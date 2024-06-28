import axios from 'axios';
import { API_KEY, BASE_URL } from './apiConfig';

const fetchShowsByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: 'vote_average.desc',
        'vote_count.gte': 50, // Ensures the show has a minimum number of votes
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching shows by genre:', error);
    return [];
  }
};

const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

const fetchShowDetails = async (showName) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/tv`, {
      params: {
        api_key: API_KEY,
        query: showName
      }
    });
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching show details:', error);
    return null;
  }
};

export { fetchShowsByGenre, fetchGenres, fetchShowDetails };
