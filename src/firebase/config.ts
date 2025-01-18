import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAE5z3fDxJaxp2ouxHrFPfr7cu6c5VAMCk",
  authDomain: "studio1-5716b.firebaseapp.com",
  projectId: "studio1-5716b",
  storageBucket: "studio1-5716b.firebasestorage.app",
  messagingSenderId: "896621725440",
  appId: "1:896621725440:web:6484b00cd36b28f31455e5",
  measurementId: "G-J38J3L1DSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export default app; 