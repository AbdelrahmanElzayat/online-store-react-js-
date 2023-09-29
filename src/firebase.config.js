import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBjtqPYHKwhKNTv827mjaKIkfvdwE5pc3Q",
  authDomain: "z-store-7a8d7.firebaseapp.com",
  projectId: "z-store-7a8d7",
  storageBucket: "z-store-7a8d7.appspot.com",
  messagingSenderId: "856173241572",
  appId: "1:856173241572:web:a358b17fcae7a123be38f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;