// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-doHmQiPoN2UtGvXLNdoAHXMhU7NHVwk",
    authDomain: "react-ef343.firebaseapp.com",
    projectId: "react-ef343",
    storageBucket: "react-ef343.appspot.com",
    messagingSenderId: "1018018774082",
    appId: "1:1018018774082:web:b12e9570a41e7aca2541db",
    measurementId: "G-33XD82D1Y7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const imageDb = getStorage(app)