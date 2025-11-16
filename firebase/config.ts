import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// --- Firebase Configuration ---
// IMPORTANT: These keys are hardcoded to ensure the application runs correctly.
// For a real production application, you MUST use environment variables
// (e.g., in Vercel) to keep your API keys secure. This prevents them
// from being exposed in your public code.
const firebaseConfig = {
  apiKey: "AIzaSyAytvuOhALNfbwewV6QnHFBTmywfbXtVAA",
  authDomain: "fearp-47bae.firebaseapp.com",
  projectId: "fearp-47bae",
  storageBucket: "fearp-47bae.appspot.com",
  messagingSenderId: "643111353469",
  appId: "1:643111353469:web:6138e9584e5722ac360514",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export services, which are now guaranteed to be initialized.
export const db = getFirestore(app);
export const auth = getAuth(app);