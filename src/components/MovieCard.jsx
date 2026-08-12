import React, { useState, useContext } from "react";
import { getImageUrl } from "../services/tmdb";
import { FavoritesContext } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const isFav = isFavorite(movie.id);
  const imageUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <article className="flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 group relative">
      {/* Heart Action Button */}
      <button
        onClick={handleFavoriteClick}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-3 left-3 z-10 p-2 bg-black/60 rounded-full border border-white/10 backdrop-blur-md shadow-sm transition-colors hover:bg-black/80"
      >
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${isFav ? "text-red-500 fill-current" : "text-white"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Poster Section with Aspect Ratio Lock */}
      <div className="relative aspect-[2/3] w-full bg-gray-800 flex items-center justify-center overflow-hidden">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 p-4 text-center">
            <svg
              className="w-12 h-12 mb-2 opacity-30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">No Poster Available</span>
          </div>
        )}

        {/* Absolute Positioned Rating Badge */}
        {rating !== "NR" && (
          <div className="absolute top-3 right-3 bg-black/80 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md shadow-sm pointer-events-none">
            ★ {rating}
          </div>
        )}
      </div>

      {/* Movie Meta Information */}
      <div className="p-4 flex flex-col flex-grow justify-start">
        <h3 className="text-base font-bold text-white leading-tight mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400 font-medium">{releaseYear}</p>
      </div>
    </article>
  );
};

export default MovieCard;
