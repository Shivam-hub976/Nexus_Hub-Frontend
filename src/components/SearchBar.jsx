import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Implement the 500ms debounce
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    // Cleanup function: clears the timeout if the user types again before 500ms
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto mb-6 w-full group">
      <label htmlFor="movie-search" className="sr-only">
        Search for movies
      </label>
      <input
        id="movie-search"
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-lg text-white rounded-full border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 shadow-lg placeholder-gray-400/80 text-sm sm:text-base font-medium"
      />
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
