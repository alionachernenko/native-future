import { initializeApp } from "firebase/app";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getRemoteConfig } from "firebase/remote-config";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAIFN4EjPoYZGzUcfYkloGkDc0vb9mPbN4",
  authDomain: "native-future.firebaseapp.com",
  projectId: "native-future",
  storageBucket: "native-future.appspot.com",
  messagingSenderId: "20640703860",
  appId: "1:20640703860:web:9cd1fbf2c38ab01a5df821",
  measurementId: "G-483W3Y05PT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const remoteConfig = getRemoteConfig(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

auth.useDeviceLanguage();
