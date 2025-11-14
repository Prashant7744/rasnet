// src/firebase/firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfYcbm4I7YSI9Ry6r6TJ-cJcFfndpcC6w",
  authDomain: "rasnet-f2731.firebaseapp.com",
  projectId: "rasnet-f2731",
  storageBucket: "rasnet-f2731.appspot.com",
  messagingSenderId: "425292720670",
  appId: "1:425292720670:web:8548c196e406619b869c0f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
