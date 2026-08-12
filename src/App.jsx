import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m13 0h-4M3 12h18M3 16h4m13 0h-4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
              CineStream
            </h1>
          </Link>
          <nav className="flex gap-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${location.pathname === "/" ? "text-blue-400" : "text-gray-400 hover:text-white"}`}
            >
              Discover
            </Link>
            <Link
              to="/favorites"
              className={`font-medium transition-colors ${location.pathname === "/favorites" ? "text-red-400" : "text-gray-400 hover:text-white"}`}
            >
              Favorites
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
