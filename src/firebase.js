// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKozQczZF6tilP3miSDpB4dJjtZEYYO-k",
    authDomain: "wanderwoofy-dc4a1.firebaseapp.com",
    projectId: "wanderwoofy-dc4a1",
    storageBucket: "wanderwoofy-dc4a1.appspot.com",
    messagingSenderId: "221453386740",
    appId: "1:221453386740:web:13d603886f01746e776fa1",
    measurementId: "G-W7X0RZC9Z3"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);;

 export const db = getFirestore(app)
 

