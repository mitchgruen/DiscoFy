// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCssRmfpvhDh4bD__1zI-fZLmBElHzalNA",
    authDomain: "ai-events-6cc46.firebaseapp.com",
    projectId: "ai-events-6cc46",
    storageBucket: "ai-events-6cc46.appspot.com",
    messagingSenderId: "82175084240",
    appId: "1:82175084240:web:9056e3d0932cf1f80880d5",
    measurementId: "G-NK5X98E2RF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (setUser) => {
    return signInWithPopup(auth, provider).then((result) => {
        console.log(result.user);
        return result.user;
    }).catch((error) => {
        return error;
    });
}