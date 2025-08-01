// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7CpErf98utaNmXfXyJGK_YY9JY0f7jSY",
  authDomain: "nyikarisanawebsite-html.firebaseapp.com",
  projectId: "nyikarisanawebsite-html",
  storageBucket: "nyikarisanawebsite-html.firebasestorage.app",
  messagingSenderId: "454911232732",
  appId: "1:454911232732:web:84a2540f5f342c06fd8219",
  measurementId: "G-KN4N9FW2H1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);