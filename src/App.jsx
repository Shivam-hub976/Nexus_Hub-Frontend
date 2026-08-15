import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

const App = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black flex flex-col overflow-x-hidden selection:bg-blue-500/30">
      {/* Enhanced glassmorphism with heavy blur and a softer border */}
      <header className="sticky top-0 z-50 bg-gray-900/70 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
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
            {/* Scaled text for mobile with a subtle drop shadow */}
            <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight drop-shadow-md">
              CineStream
            </h1>
          </Link>

          {/* Responsive gap and text sizing for navigation */}
          <nav className="flex gap-4 sm:gap-6">
            <Link
              to="/"
              className={`text-sm sm:text-base font-medium transition-all duration-300 ${
                location.pathname === "/"
                  ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Discover
            </Link>
            <Link
              to="/favorites"
              className={`text-sm sm:text-base font-medium transition-all duration-300 ${
                location.pathname === "/favorites"
                  ? "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Favorites
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
