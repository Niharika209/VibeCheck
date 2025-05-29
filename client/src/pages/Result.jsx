import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    navigate("/quiz");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-200 to-yellow-100 px-4 py-10">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-white text-center relative overflow-hidden border border-pink-300">
        
        {/* Decorative floating emoji */}
        <div className="absolute text-8xl top-[-30px] left-[-30px] rotate-12 opacity-10">{result.emoji}</div>
        <div className="absolute text-7xl bottom-[-20px] right-[-20px] -rotate-12 opacity-10">{result.emoji}</div>

        {/* Main Emoji */}
        <div className="text-7xl mb-4 animate-bounce drop-shadow-md">{result.emoji}</div>

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-pink-600 mb-4 drop-shadow-sm">
          {result.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed px-2">
          {result.description}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/quiz")}
          className="mt-4 bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default Result;
