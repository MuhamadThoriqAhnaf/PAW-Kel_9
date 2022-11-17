import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxOnK_vgpH89g8_rh-MoKDwQxiFZvP0QQ",
  authDomain: "paw-mylibrary.firebaseapp.com",
  projectId: "paw-mylibrary",
  storageBucket: "paw-mylibrary.appspot.com",
  messagingSenderId: "679794706271",
  appId: "1:679794706271:web:bfe350bfaffcc752fb18ea",
  measurementId: "G-ES2QP9YPM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);