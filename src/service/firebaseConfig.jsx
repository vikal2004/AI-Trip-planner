// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXcQkrDx_ly_wEmeDV8K6DUMzKqZEAQfQ",
  authDomain: "trip-planner-c7881.firebaseapp.com",
  projectId: "trip-planner-c7881",
  storageBucket: "trip-planner-c7881.firebasestorage.app",
  messagingSenderId: "530271725216",
  appId: "1:530271725216:web:a8605f89b32a20f5588bc5",
  measurementId: "G-T2P36CFMMR"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)