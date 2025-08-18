import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIKjlLQ4gJ9usDVowk2FQy6BayY-GtphI",
  authDomain: "thewh2store-8b44c.firebaseapp.com",
  databaseURL: "https://thewh2store-8b44c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thewh2store-8b44c",
  storageBucket: "thewh2store-8b44c.firebasestorage.app",
  messagingSenderId: "106086691671",
  appId: "1:106086691671:web:6f099d38f8708ce6274412"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);