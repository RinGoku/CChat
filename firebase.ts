// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyAwFcN-RWKvFiEMCmcfXs8jfaJc11cJs48",
  authDomain: "ccouple-51ace.firebaseapp.com",
  databaseURL:
    "https://ccouple-51ace-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ccouple-51ace",
  storageBucket: "ccouple-51ace.appspot.com",
  messagingSenderId: "402327420881",
  appId: "1:402327420881:web:9077147571a82a999e6af0",
  measurementId: "G-SFTXTEBJHD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, messaging };
