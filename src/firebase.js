import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVR5pampapbaYlGSMGXgkbCIN4F_9bXxw",
  authDomain: "plants-manager.firebaseapp.com",
  projectId: "plants-manager",
  storageBucket: "plants-manager.appspot.com",
  messagingSenderId: "65768614160",
  appId: "1:65768614160:web:7b3591e3399a3b0c06dd95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;