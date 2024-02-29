// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyIvqzE_Wv6HUStkQBuaZ1OcVHKa-9Opk",
  authDomain: "m-com-ad72f.firebaseapp.com",
  projectId: "m-com-ad72f",
  storageBucket: "m-com-ad72f.appspot.com",
  messagingSenderId: "930360203423",
  appId: "1:930360203423:web:2be15d42bded624ea7aaaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);