// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPgUUBGvzQCNqWF8OEQvW7W0CnNgvym-A",
  authDomain: "meetup-schedule-app.firebaseapp.com",
  projectId: "meetup-schedule-app",
  storageBucket: "meetup-schedule-app.appspot.com",
  messagingSenderId: "163743881823",
  appId: "1:163743881823:web:700e06861ed419a56bd9ea",
  measurementId: "G-STBL6P8CY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);




