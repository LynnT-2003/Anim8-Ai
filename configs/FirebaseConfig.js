// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "anim8-8db3a.firebaseapp.com",
  projectId: "anim8-8db3a",
  storageBucket: "anim8-8db3a.firebasestorage.app",
  messagingSenderId: "40957814416",
  appId: "1:40957814416:web:5bbd3e5c8991e7997eda15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
