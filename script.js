import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7CpErf98utaNmXfXyJGK_YY9JY0f7jSY",
    authDomain: "nyikarisanawebsite-html.firebaseapp.com",
    projectId: "nyikarisanawebsite-html",
    storageBucket: "nyikarisanawebsite-html.firebasestorage.app",
    messagingSenderId: "454911232732",
    appId: "1:454911232732:web:84a2540f5f342c06fd8219",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to redirect user based on role
function redirectToProfile(role) {
    const rolePages = {
        "Student": "student-profile.html",
        "Teacher": "teacher-profile.html",
        "Teacher assistant": "teacher assistant-profile.html",
        "Parent": "parent-profile.html",
        "Principal": "principal-profile.html",
        "Admin": "admin-profile.html",
        "SGB": "sgb-profile.html"
    };

    if (rolePages[role]) {
        window.location.href = rolePages[role];
    } else {
        console.error("Unknown role:", role);
    }
}

// Register new user
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const identity = document.getElementById('register-identity').value;
    const role = document.getElementById('register-role').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            identity: identity,
            role: role,
        });

        alert("User registered successfully!");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Login user
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user role and redirect to the appropriate profile page
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const role = userDoc.data().role;
            redirectToProfile(role);
        } else {
            console.error("No user data found in Firestore.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Logout user
document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert("User logged out successfully!");
        window.location.href = "NyikarisanaWebsite.html"; // Redirect to NyikarisanaWebsite.html
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Check if a user is already logged in and update UI
onAuthStateChanged(auth, async (user) => {
    const logoutButton = document.getElementById('logout-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (user) {
        logoutButton.style.display = 'block';
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';

        // Get user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userRole = userDoc.data().role;

            // Redirect user to their profile ONLY if they are on the login page
            if (window.location.pathname.includes("index.html")) {
                redirectToProfile(userRole);
            }
        }
    } else {
        logoutButton.style.display = 'none';
        loginForm.style.display = 'block';
        registerForm.style.display = 'block';
    }
});