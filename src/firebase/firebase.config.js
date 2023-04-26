// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF1LrwWCmIqGKvDhuNVP-w_nnGLX6SGDc",
  authDomain: "ema-john-with-firebase-70b19.firebaseapp.com",
  projectId: "ema-john-with-firebase-70b19",
  storageBucket: "ema-john-with-firebase-70b19.appspot.com",
  messagingSenderId: "338609016240",
  appId: "1:338609016240:web:3c60301ee97184f3e91a75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app