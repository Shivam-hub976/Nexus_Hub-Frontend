import React, { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies } from "./services/tmdb";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // This effect now listens to searchQuery.
  // When it changes (after the 500ms debounce), it fetches new data.
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        // If there's a search term, hit the search endpoint. Otherwise, load defaults.
        if (searchQuery.trim().length > 0) {
          data = await searchMovies(searchQuery, 1);
        } else {
          data = await fetchPopularMovies(1);
        }

        // Handle OMDB returning a "False" response when no movies match
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setMovies([]);
          setError(`No results found for "${searchQuery}".`);
        }
      } catch (err) {
        setError(
          "Failed to fetch movies. Please check your API key and network connection.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🎬
            </span>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
              CineStream
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Render our new SearchBar */}
        <SearchBar onSearch={setSearchQuery} />

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded-lg text-center mb-8">
            {error}
          </div>
        )}

        {!searchQuery && !error && (
          <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-3">
            Popular Right Now
          </h2>
        )}

        {searchQuery && !error && (
          <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-3">
            Search Results
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
