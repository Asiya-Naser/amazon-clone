// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import 'firebase/compat/firestore'
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlRp6dUUChwPSJZTIRB3O3Mk-jzjq-EY8",
  authDomain: "clone-f0dcc.firebaseapp.com",
  projectId: "clone-f0dcc",
  storageBucket: "clone-f0dcc.firebasestorage.app",
  messagingSenderId: "67090234477",
  appId: "1:67090234477:web:cc0d0df0408361703f5364",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=app.firestore()