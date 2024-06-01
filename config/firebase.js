import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_EvqqJSAhxsrhbT9-AE79vV4s2Mdb5CM",
  authDomain: "altair-6ad57.firebaseapp.com",
  projectId: "altair-6ad57",
  storageBucket: "altair-6ad57.appspot.com",
  messagingSenderId: "788036844674",
  appId: "1:788036844674:web:0f712a185da3abcd4bc89b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };
