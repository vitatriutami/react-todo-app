// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjHNFau8z1YsEYCOH0I13X4hg2Z3GNCmE",
  authDomain: "todo-755fc.firebaseapp.com",
  projectId: "todo-755fc",
  storageBucket: "todo-755fc.appspot.com",
  messagingSenderId: "746232802764",
  appId: "1:746232802764:web:ba69c5302fb9b9c0fc8169",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
