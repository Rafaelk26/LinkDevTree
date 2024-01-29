import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-xsWyBHXBGw1JtZAurzlS8KGw-eQczVI",
  authDomain: "reactlinks-2425a.firebaseapp.com",
  projectId: "reactlinks-2425a",
  storageBucket: "reactlinks-2425a.appspot.com",
  messagingSenderId: "976740945734",
  appId: "1:976740945734:web:f14a5511134cca93c79f47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }