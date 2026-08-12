import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize state directly from localStorage to prevent UI flickering on mount
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("cinestream_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to localStorage whenever the favorites array mutates
  useEffect(() => {
    localStorage.setItem("cinestream_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.find((item) => item.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((item) => item.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
