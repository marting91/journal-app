// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuKCn414oY1q7TDng29Fi5bX9OiX_OIHI",
  authDomain: "react-journal-app-eb946.firebaseapp.com",
  projectId: "react-journal-app-eb946",
  storageBucket: "react-journal-app-eb946.appspot.com",
  messagingSenderId: "442046815866",
  appId: "1:442046815866:web:8c0b96e5c882c3318925c3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth( firebaseApp );
export const firebaseDB = getFirestore( firebaseApp );