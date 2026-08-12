import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-red-500 pl-3">
        My Favorites
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 py-20 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
          <p className="text-lg font-medium mb-2">No favorites yet.</p>
          <p className="text-sm">
            Click the heart icon on a movie to save it here!
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
