import React from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function TestWrite() {
  const handleWrite = async () => {
    try {
      await addDoc(collection(db, "quizResponses"), {
        name: "Niharika",
        vibe: "Chaotic",
        moodEmoji: "🔥",
        timestamp: new Date()
      });
      alert("Dummy quiz response saved!");
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleWrite}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Dummy Quiz Response
      </button>
    </div>
  );
}

export default TestWrite;
