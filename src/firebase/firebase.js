import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBEfZVeUzu-ir24akGyKTc-2pSZG1uzFg4",
    authDomain: "family-bank-app-4d547.firebaseapp.com",
    databaseURL: "https://family-bank-app-4d547-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "family-bank-app-4d547",
    storageBucket: "family-bank-app-4d547.appspot.com",
    messagingSenderId: "924794641017",
    appId: "1:924794641017:web:7c26763e2d7f5956a7d2a8",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail };