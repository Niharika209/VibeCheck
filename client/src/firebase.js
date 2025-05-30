// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKSlK3oIkp0Sh0RF4EI6joL8c7h2rkrM4",
  authDomain: "vibecheck-68ae9.firebaseapp.com",
  projectId: "vibecheck-68ae9",
  storageBucket: "vibecheck-68ae9.appspot.com",
  messagingSenderId: "637106822949",
  appId: "1:637106822949:web:ab8ff2c0dd574ffb7344cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the database to use in your components
export { db };