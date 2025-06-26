// Firebase initialization and Firestore export
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSASH_FE7RN573ISOFc9UMwwLWJTzfhMA",
  authDomain: "reaper-resins.firebaseapp.com",
  projectId: "reaper-resins",
  storageBucket: "reaper-resins.appspot.com",  // FIXED typo here
  messagingSenderId: "642380335370",
  appId: "1:642380335370:web:4a7732d93d8b729c9fd2f3",
  measurementId: "G-TZGRB8GWYD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

