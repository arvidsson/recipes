import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUKBZ_7E7lpc0LB7RoJrEpqs738-KXw-s",
  authDomain: "recipes-87781.firebaseapp.com",
  projectId: "recipes-87781",
  storageBucket: "recipes-87781.appspot.com",
  messagingSenderId: "688964351181",
  appId: "1:688964351181:web:94fe1f96d329b114172584",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
