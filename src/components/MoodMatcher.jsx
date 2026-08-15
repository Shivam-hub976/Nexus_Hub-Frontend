import React, { useState } from "react";
import { getMovieByMood } from "../services/gemini";

const MoodMatcher = ({ onSearch }) => {
  const [mood, setMood] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const suggestedTitle = await getMovieByMood(mood);
      onSearch(suggestedTitle);
      setMood("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-10 w-full relative group">
      {/* Premium glowing background behind the input */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

      <div className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 shadow-xl">
        <form
          onSubmit={handleMoodSubmit}
          className="relative bg-gray-900/80 backdrop-blur-xl rounded-full flex items-center overflow-hidden"
        >
          <input
            type="text"
            placeholder="AI Mood Matcher: E.g., 'I want a funny sci-fi movie...'"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-6 py-4 bg-transparent text-white focus:outline-none placeholder-gray-400/80 text-sm sm:text-base font-medium"
          />
          <button
            type="submit"
            disabled={isAnalyzing || !mood.trim()}
            className="px-6 py-2.5 mr-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full hover:from-indigo-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
          >
            {isAnalyzing ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                <span className="text-lg">✨</span>
                <span className="hidden sm:inline">Ask AI</span>
              </>
            )}
          </button>
        </form>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-4 text-center font-medium bg-red-900/20 py-2 rounded-lg border border-red-500/20 backdrop-blur-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default MoodMatcher;
