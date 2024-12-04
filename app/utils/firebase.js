// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1BJRHXkYInmUFU5Uun3FlHdwlXaLfrvE",
  authDomain: "rosselli-netlify.firebaseapp.com",
  projectId: "rosselli-netlify",
  storageBucket: "rosselli-netlify.firebasestorage.app",
  messagingSenderId: "474424161413",
  appId: "1:474424161413:web:68592636123f07f10da5ec",
  measurementId: "G-M80Q3FL6XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);