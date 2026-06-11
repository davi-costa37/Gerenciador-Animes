import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyACony6BrpgxUrpO6-2gZfUAQp-9YHlWMs",
  authDomain: "nfclistaanimes.firebaseapp.com",
  projectId: "nfclistaanimes",
  storageBucket: "nfclistaanimes.firebasestorage.app",
  messagingSenderId: "1076095486788",
  appId: "1:1076095486788:web:4be6288ba9e2225a3be511"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
};