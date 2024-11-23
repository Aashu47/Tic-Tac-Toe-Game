// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAm6q04Ngve3D6d14Eyc1CgCoUcXGLP6xU",
    authDomain: "ecommerce-website-a7e5e.firebaseapp.com",
    projectId: "ecommerce-website-a7e5e",
    storageBucket: "ecommerce-website-a7e5e.appspot.com",
    messagingSenderId: "570951820312",
    appId: "1:570951820312:web:d27b53c8147ac9edd48f6d",
    measurementId: "G-MH4FNP09B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
