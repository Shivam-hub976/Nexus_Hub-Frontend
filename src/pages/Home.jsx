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

  // NEW: State to track if we should keep asking for more pages
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // Reset pagination AND hasMore whenever the user types a new search query
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

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
          setMovies((prev) =>
            page === 1 ? data.results : [...prev, ...data.results],
          );

          // OMDB returns 10 items per page. If it returns less, we've hit the end.
          if (data.results.length < 10) {
            setHasMore(false);
          }
        } else {
          // If no results come back, stop trying to fetch more pages
          setHasMore(false);

          if (page === 1) {
            setMovies([]);
            // Handle OMDB's specific behavior for short/broad queries
            if (searchQuery.length < 3) {
              setError(
                `Please enter a more specific search term (3 or more characters).`,
              );
            } else {
              setError(`No results found for "${searchQuery}".`);
            }
          }
        }
      } catch (err) {
        setError(
          "Failed to fetch movies. Please check your network connection.",
        );
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // NEW: Only increment the page if we know more data exists (hasMore === true)
        if (target.isIntersecting && !loading && hasMore) {
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

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]); // Added hasMore to dependency array

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

      {/* NEW: Only render the loader div if there is more data to fetch */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="w-full h-10 mt-4 flex items-center justify-center"
        >
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
