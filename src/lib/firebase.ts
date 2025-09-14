// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHupN4OPYTnFxsYnlu-gDqc2uWBd542-Y",
  authDomain: "studio-3597294011-e2531.firebaseapp.com",
  projectId: "studio-3597294011-e2531",
  storageBucket: "studio-3597294011-e2531.firebasestorage.app",
  messagingSenderId: "88247050202",
  appId: "1:88247050202:web:56e1984b11e6ceda7aeae3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


export { app, db, storage, auth };
