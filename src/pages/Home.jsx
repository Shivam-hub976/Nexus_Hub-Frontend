import React, { useState, useEffect, useRef } from "react";
import { fetchPopularMovies, searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Reference for the IntersectionObserver target
  const loaderRef = useRef(null);

  // Reset to page 1 whenever the user types a new search query
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Fetch data when the search query or the page number changes
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (searchQuery.trim().length > 0) {
          data = await searchMovies(searchQuery, page);
        } else {
          data = await fetchPopularMovies(page);
        }

        if (data.results && data.results.length > 0) {
          // If page is 1, replace state. If page > 1, spread and append.
          setMovies((prev) =>
            page === 1 ? data.results : [...prev, ...data.results],
          );
        } else if (page === 1) {
          setMovies([]);
          setError(`No results found for "${searchQuery}".`);
        }
      } catch (err) {
        setError(
          "Failed to fetch movies. Please check your network connection.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery, page]);

  // Native Infinite Scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // Increment page if the loader div is visible and we aren't currently fetching
        if (target.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup phase strictly prevents memory leaks
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="w-full">
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
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {/* IntersectionObserver Trigger Point */}
      <div
        ref={loaderRef}
        className="w-full h-10 mt-4 flex items-center justify-center"
      >
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        )}
      </div>
    </div>
  );
};

export default Home;
