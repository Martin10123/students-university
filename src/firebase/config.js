import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAd9edBsyNHaInZ8DbsawpxZirn2UwN21M",
  authDomain: "students-university.firebaseapp.com",
  projectId: "students-university",
  storageBucket: "students-university.appspot.com",
  messagingSenderId: "425461917625",
  appId: "1:425461917625:web:2d8047982e48887eb5b868",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
