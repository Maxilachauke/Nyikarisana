// Your Firebase config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyD7CpErf98utaNmXfXyJGK_YY9JY0f7jSY",
  authDomain: "nyikarisanawebsite-html.firebaseapp.com",
  projectId: "nyikarisanawebsite-html",
  storageBucket: "nyikarisanawebsite-html.appspot.com",
  messagingSenderId: "454911232732",
  appId: "1:454911232732:web:84a2540f5f342c06fd8219",
  measurementId: "G-KN4N9FW2H1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Shortcut references
const auth = firebase.auth();
const db = firebase.firestore();
