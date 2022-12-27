importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
