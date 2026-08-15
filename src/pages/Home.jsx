import React, { useState, useEffect, useRef } from "react";
import { fetchPopularMovies, searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import MoodMatcher from "../components/MoodMatcher";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

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

          if (data.results.length < 10) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);

          if (page === 1) {
            setMovies([]);
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
  }, [loading, hasMore]);

  return (
    <div className="w-full relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <SearchBar onSearch={setSearchQuery} />

      <MoodMatcher onSearch={setSearchQuery} />

      {error && (
        <div className="max-w-2xl mx-auto bg-red-900/20 backdrop-blur-md border border-red-500/30 text-red-300 px-6 py-4 rounded-xl text-center mb-10 shadow-lg">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Premium Section Headers */}
      {!searchQuery && !error && (
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-7 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.6)]"></div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            Popular Right Now
          </h2>
        </div>
      )}

      {searchQuery && !error && (
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-7 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.6)]"></div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            Search Results
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div
          ref={loaderRef}
          className="w-full h-20 mt-8 flex items-center justify-center"
        >
          {loading && (
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 h-10 border-4 border-blue-500/20 rounded-full"></div>
              <div className="w-10 h-10 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
