import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">
        What's your vibe today?
      </h1>

      <button
        onClick={handleStartQuiz}
        className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-100 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}
