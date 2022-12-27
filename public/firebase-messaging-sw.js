importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAwFcN-RWKvFiEMCmcfXs8jfaJc11cJs48",
  authDomain: "ccouple-51ace.firebaseapp.com",
  databaseURL:
    "https://ccouple-51ace-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ccouple-51ace",
  storageBucket: "ccouple-51ace.appspot.com",
  messagingSenderId: "402327420881",
  appId: "1:402327420881:web:9077147571a82a999e6af0",
  measurementId: "G-SFTXTEBJHD",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
