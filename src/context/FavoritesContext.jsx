import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize state with enterprise-grade error boundary
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("cinestream_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return []; // Fallback to empty array if data is corrupted
    }
  });

  // Sync state to localStorage whenever the favorites array mutates
  useEffect(() => {
    try {
      localStorage.setItem("cinestream_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      // Prevent duplicates safely
      if (prev.some((item) => item.id === movie.id)) return prev;
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
