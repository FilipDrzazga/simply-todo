import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

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
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  collection,
  query,
  where,
  orderBy,
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  serverTimestamp,
  writeBatch,
};
