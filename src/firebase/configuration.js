import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw4KgLqQK8R-IjaJ20NESoz4pTqOz18t8",
  authDomain: "social-media-8c82c.firebaseapp.com",
  databaseURL: "https://social-media-8c82c-default-rtdb.firebaseio.com",
  projectId: "social-media-8c82c",
  storageBucket: "social-media-8c82c.firebasestorage.app",
  messagingSenderId: "523675793348",
  appId: "1:523675793348:web:838873889ff674a576d691",
  measurementId: "G-Q9R6JX21SQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
