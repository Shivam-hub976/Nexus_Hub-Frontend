import axios from 'axios';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';
const apiKey = import.meta.env.VITE_OMDB_KEY;

// Pre-configured Axios instance for OMDB
const omdbClient = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: apiKey, // OMDB uses 'apikey' instead of 'api_key'
  },
});

/**
  OMDB returns full image URLs (or "N/A").
 */
export const getImageUrl = (posterPath) => {
  if (!posterPath || posterPath === 'N/A') return null;
  return posterPath;
};

/**
  Helper to map OMDB response keys to our existing TMDB-based UI components.
  This prevents us from having to rewrite the MovieCard component.
 */
const mapOmdbToTmdb = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  release_date: movie.Year,
  poster_path: movie.Poster,
  vote_average: null, // OMDB search endpoint doesn't return ratings
});

/**
  OMDB lacks a "popular" endpoint. 
  We simulate it by fetching a highly popular franchise default.
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await omdbClient.get('/', {
      // Changed the search query to a popular franchise to simulate "popular" movies
      params: { s: 'India', page, type: 'movie' },
    });
    
    const movies = response.data.Search ? response.data.Search.map(mapOmdbToTmdb) : [];
    return { results: movies };
  } catch (error) {
    console.error('Error fetching popular movies from OMDB:', error);
    throw error;
  }
};
/**
  Searches movies by query term with pagination support.
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await omdbClient.get('/', {
      params: { s: query, page, type: 'movie' },
    });
    
    const movies = response.data.Search ? response.data.Search.map(mapOmdbToTmdb) : [];
    return { results: movies };
  } catch (error) {
    console.error('Error searching movies on OMDB:', error);
    throw error;
  }
};