import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6TN_FQoUc_mKeQn-cxWoLcQnakzTs_Q4",
  authDomain: "smartlane-21891.firebaseapp.com",
  projectId: "smartlane-21891",
  storageBucket: "smartlane-21891.appspot.com",
  messagingSenderId: "473003583448",
  appId: "1:473003583448:web:ecb17165487cf3c330b4ad",
  measurementId: "G-Q2WP1VHV93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
