import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Brand } from "types/brand";
import { assertFilledString, FilledString } from "types/filledString";

export type FCMToken = Brand<FilledString, "FCMToken">;
function asFCMToken(v: unknown): FCMToken {
  assertFilledString(v, "FCMToken");
  return v as FCMToken;
}
export const useGetTokenFCM = () => {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  const messaging = getMessaging();
  const token = new Promise<FCMToken>((resolve, reject) =>
    getToken(messaging, { vapidKey: process.env.FCM_KEY })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          resolve(asFCMToken(currentToken));
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          reject();
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        reject();
      })
  );

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
};
