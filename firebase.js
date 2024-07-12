// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiTscpzEjq1_Ir0ro5IcSj_pS3Ds8wQ2Y",
  authDomain: "react-native-a96d7.firebaseapp.com",
  projectId: "react-native-a96d7",
  storageBucket: "react-native-a96d7.appspot.com",
  messagingSenderId: "651042100743",
  appId: "1:651042100743:web:08f7be92f11d00cf1e3ca2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
