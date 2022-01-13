// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBH7RZ02YkMs_UCa7YHY5RX9ODs0AruSns",
    authDomain: "bobthecoder-dev.firebaseapp.com",
    projectId: "bobthecoder-dev",
    storageBucket: "bobthecoder-dev.appspot.com",
    messagingSenderId: "10024596278",
    appId: "1:10024596278:web:e35b8c194a0035b2c9f997"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export const FirebaseApp = {
    app,
    auth,
}