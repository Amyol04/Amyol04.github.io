
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIvr6RM1UAo9uIfpYKyA1XogFlGdaDMFc",
  authDomain: "amy-portfolio-9e137.firebaseapp.com",
  projectId: "amy-portfolio-9e137",
  storageBucket: "amy-portfolio-9e137.firebasestorage.app",
  messagingSenderId: "999897519499",
  appId: "1:999897519499:web:6a05e5c65863199c610b8e",
  measurementId: "G-9DT1QFPZ9K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
