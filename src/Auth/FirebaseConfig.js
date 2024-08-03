// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABmVACbDnPMXZZRlN_qGj05kFQV1KOIcg",
    authDomain: "moneyreminder-2c305.firebaseapp.com",
    projectId: "moneyreminder-2c305",
    storageBucket: "moneyreminder-2c305.appspot.com",
    messagingSenderId: "294976915932",
    appId: "1:294976915932:web:38bd8ddc4926ec52fa6719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

