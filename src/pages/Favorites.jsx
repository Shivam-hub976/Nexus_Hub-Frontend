import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="w-full animate-fade-in relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl sm:text-3xl drop-shadow-md">❤️</span>
        <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500 tracking-tight drop-shadow-sm">
          My Favorites
        </h2>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 hover:bg-gray-800/60 hover:border-white/10">
          <div className="w-20 h-20 mb-6 bg-gradient-to-br from-red-500/20 to-rose-500/5 rounded-full flex items-center justify-center border border-red-500/20 shadow-inner">
            <svg
              className="w-10 h-10 text-red-500/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mb-2">
            No favorites yet
          </p>
          <p className="text-sm sm:text-base text-gray-400 max-w-md">
            Click the heart icon on any movie card to build your personalized
            watchlist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
