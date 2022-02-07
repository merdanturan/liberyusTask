import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCSY6OXPPNUNqHrbULQlLsWB4zSBsLau4g",
    authDomain: "liberyus-44d1c.firebaseapp.com",
    projectId: "liberyus-44d1c",
    storageBucket: "liberyus-44d1c.appspot.com",
    messagingSenderId: "894710982915",
    appId: "1:894710982915:web:86974a8a4c89348116a136",
    measurementId: "G-D8DY2Y4PWV"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)