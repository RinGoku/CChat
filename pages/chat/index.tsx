"use client";
import "firebase/messaging";
import { getToken } from "firebase/messaging";
import { messaging } from "firebase";
import Link from "next/link";
import { trpc } from "utils/trpc";
import { useGetTokenFCM } from "components/chat/useGetTokenFCM";
import { useEffect } from "react";
import { useRouter } from "next/router";
import channels from "pages/channels";
import { firebaseCloudMessaging } from "utils/firebase";
import firebase from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const Channel = () => {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/message").then((res) => {
      console.log(res);
    });
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();
    console.log(onMessage);
    onMessage(messaging, (message) => {
      console.log(message);
    });
  }
  return (
    <div>
      <Link href="/">Go home</Link>
    </div>
  );
};

export default Channel;
