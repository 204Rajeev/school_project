// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMfmWits3_zymONoDYU-pVnVN6Eu-AI4I",
  authDomain: "college-website-b5636.firebaseapp.com",
  projectId: "college-website-b5636",
  storageBucket: "college-website-b5636.appspot.com",
  messagingSenderId: "394507441672",
  appId: "1:394507441672:web:8e4e4276b0071630fc23bd",
  measurementId: "G-WN4F5Y804X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);