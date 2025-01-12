// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8dyvssaHBDlilMqIl1Krc4dl2AnRkkBA",
  authDomain: "add-and-retrive-info.firebaseapp.com",
  projectId: "add-and-retrive-info",
  storageBucket: "add-and-retrive-info.firebasestorage.app",
  messagingSenderId: "571215423319",
  appId: "1:571215423319:web:e1b507e327364d738fc012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };