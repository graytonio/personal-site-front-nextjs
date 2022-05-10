import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0AR0LZIAu6NQqgnK0-aaNCCP3RsWGMks",
  authDomain: "personal-site-37121.firebaseapp.com",
  projectId: "personal-site-37121",
  storageBucket: "personal-site-37121.appspot.com",
  messagingSenderId: "936429775444",
  appId: "1:936429775444:web:6c41017d4afe63cceb5bc1",
  measurementId: "G-RKB4WHG1Y9",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
