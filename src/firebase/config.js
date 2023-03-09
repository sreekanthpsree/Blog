import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBk9CUobyPnncD1ohrEMaaXcU9wnvMNCRY",
  authDomain: "blog-9d5e0.firebaseapp.com",
  projectId: "blog-9d5e0",
  storageBucket: "blog-9d5e0.appspot.com",
  messagingSenderId: "513051559324",
  appId: "1:513051559324:web:3f080d218ad12a9cc53459",
  measurementId: "G-0BY48JWHTW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage();
export { collection, getDocs, db, addDoc, app, storage, ref };
