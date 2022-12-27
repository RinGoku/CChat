import { getMessaging } from "firebase/messaging";
import { initializeApp, getApps } from "firebase/app";
import { getToken } from "firebase/messaging";

const firebaseCloudMessaging = {
  init: async () => {
    if (!getApps()?.length) {
      // Initialize the Firebase app with the credentials
      initializeApp({
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

      try {
        const messaging = getMessaging();
        const tokenInLocalForage = localStorage.getItem("fcm_token");

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await getToken(messaging, {
            vapidKey:
              "BAPnndpPLqkhCRulMJVHjsDMbOHQmkXvDKbv4uMZ05SWkmyl-WQ6hxG_mf-_Z8-t3GH4M7nF4BenM5IQ3X6wJ1I",
          });

          // Set token in our local storage
          if (fcm_token) {
            localStorage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
