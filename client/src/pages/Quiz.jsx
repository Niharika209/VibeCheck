import React, { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { analyzeVibe } from '../utils/vibeLogic';

const questions = [
  {
    id: 1,
    question: "Which emoji best describes your current mood?",
    type: "emoji",
    options: ["😊", "😩", "😎", "😠", "🥱", "🤪", "🥺", "😐"]
  },
  {
    id: 2,
  question: "Pick your ideal weekend activity",
  type: "text",
  options: [
    "Hiking in the mountains 🏞️",
    "Binge-watching a new series 📺",
    "Dancing at a party 💃",
    "Reading a good book in bed 📚",
    "Exploring cafes or restaurants ☕🍽️",
    "Attending a concert 🎤"
    ]
  },
  {
     id: 3,
  question: "Choose your favourite music genre — what would you like to listen to right now?",
  type: "text+audio",
  options: [
    { label: "Pop (English & Bollywood) — Blinding Lights, Shape of You, Tum Hi Ho", value: "pop" },
    { label: "Punjabi — Brown Munde, 3 Peg", value: "punjabi" },
    { label: "Haryanvi — 52 Gaj Ka Daman, Russian Bandana", value: "haryanvi" },
    { label: "Lofi — Chill beats and soft instrumentals - Kesariya, Heeriye", value: "lofi" },
    { label: "Desi Hip Hop — Divine, Seedhe Maut, Emiway Bantai", value: "desi_hiphop" },
    { label: "Classical — Moonlight Sonata, Aafreen", value: "classical" },
    { label: "Indie — Riptide, Kho Gaye Hum Kahan", value: "indie" }
  ]
  },
  {
    id: 4,
    question: "What's your go-to comfort food?",
    type: "image+text",
    options: [
      "Pizza 🍕", "Ice Cream 🍨", "Biryani 🍛", "Chocolate 🍫", "Maggi 🍜", "Fries 🍟"
    ]
  },
  {
    id: 5,
    question: "Choose your perfect vacation spot",
    type: "image",
    options: [
      "Tropical Beach 🏝️",
      "Snowy Mountains 🏔️",
      "Historical City 🏛️",
      "Desert Retreat 🏜️",
      "Rainforest 🌴",
      "Big City 🌆"
    ]
  },
  {
    id: 6,
    question: "How do you recharge after a long day?",
    type: "text",
    options: [
      "Sleeping or napping",
      "Talking to someone I love",
      "Watching YouTube/Netflix",
      "Cooking or eating something tasty",
      "Journaling or meditating",
      "Going for a walk"
    ]
  },
  {
    id: 7,
    question: "Pick a fashion style that fits you best",
    type: "image+text",
    options: [
      "Streetwear 🧢", "Minimalist 👕", "Boho 🌸", "Formal 👔", "Casual 👖", "Sporty 👟"
    ]
  },
  {
    id: 8,
    question: "Your ideal way to spend a Friday night",
    type: "text",
    options: [
      "Clubbing and partying 🎉",
      "Cuddling with a book 📖",
      "Gaming all night 🎮",
      "Movie marathon 🍿",
      "Working on personal goals 💻",
      "Deep conversations with friends ☕"
    ]
  },
  {
    id: 9,
    question: "Pick an animal that vibes with your personality",
    type: "emoji+text",
    options: [
      "Cat 🐱", "Dog 🐶", "Dolphin 🐬", "Owl 🦉", "Panda 🐼", "Fox 🦊"
    ]
  },
  {
    id: 10,
    question: "Choose a drink you'd like to have right now",
    type: "text+emoji",
    options: [
      "Coffee/Chai ☕", "Bubble Tea 🧋", "Fresh Juice 🍹", "Soda 🥤", "Hot Chocolate 🍫", "Water 💧", "Beer 🍺", "Cocktail 🍸"
    ]
  },
  {
    id: 11,
    question: "Which movie genre do you prefer watching these days?",
    type: "text",
    options: [
      "Romantic 💖", "Thriller 😱", "Comedy 😂", "Horror 👻", "Drama 🎭", "Fantasy 🧙"
    ]
  },
  {
    id: 12,
    question: "What kind of friend are you?",
    type: "text",
    options: [
      "The Therapist 🧠",
      "The Clown 🤡",
      "The Adventurer 🧭",
      "The Planner 📅",
      "The Listener 👂",
      "The Chaotic One 🔥"
    ]
  },
  {
    id: 13,
    question: "What's your body feeling right now?",
    type: "text",
    options: [
      "Tired and sore 😩",
      "Energized and light ⚡",
      "Cozy and sleepy 💤",
      "A bit anxious 😬",
      "Pretty neutral 😐",
      "Hyper and restless 🤪"
    ]
  },
  {
    id: 14,
    question: "What does your current surrounding feel like?",
    type: "text",
    options: [
      "Warm and cozy 🛋️",
      "Noisy and chaotic 🔊",
      "Serene and quiet 🌿",
      "Cold and gloomy 🌧️",
      "Bright and airy 🌞",
      "Dim and peaceful 🌙"
    ]
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleOptionChange(qId, optionValue) {
    setAnswers((prev) => ({ ...prev, [qId]: optionValue }));
  }

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions!");
      return;
    }

    setLoading(true);
    try {
      // Generate vibe analysis
      const vibeResult = analyzeVibe(answers);

      // Save to Firestore
      const docRef = await addDoc(collection(db, "responses"), {
        answers,
        vibeResult,
        timestamp: new Date()
      });

      console.log("Response saved with ID:", docRef.id);
      // Navigate to result page with vibe data
      navigate('/result', { state: { result: vibeResult } });
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Thanks for completing the quiz!</h2>
        <p className="mb-6">Your vibe has been successfully recorded! 🎉</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Vibe Check Quiz</h1>
      {questions.map(({ id, question, options }) => (
        <div key={id} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{id}. {question}</h3>
          <div className="flex flex-wrap gap-3">
            {options.map((option, idx) => {
              // Determine label and value
              const label = typeof option === "string" ? option : option.label;
              const value = typeof option === "string" ? option : option.value;

              return (
                <label
                  key={`${id}-${idx}`}
                  className={`cursor-pointer border rounded px-4 py-2 hover:bg-pink-100 hover:text-pink-600 transition ${
                    answers[id] === value ? "bg-pink-600 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${id}`}
                    value={value}
                    checked={answers[id] === value}
                    onChange={() => handleOptionChange(id, value)}
                    className="hidden"
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-pink-600 text-white py-3 px-6 rounded hover:bg-pink-700 transition w-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Saving...' : 'Submit'}
      </button>
    </div>
  );
}
