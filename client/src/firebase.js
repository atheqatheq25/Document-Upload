import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPwRRAdYpc54O1QHZIm2RntNHxETZK01s",
  authDomain: "document-upload-75f50.firebaseapp.com",
  projectId: "document-upload-75f50",
  storageBucket: "document-upload-75f50.firebasestorage.app",
  messagingSenderId: "473886679975",
  appId: "1:473886679975:web:822cbec5308cf2f8894c82",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();