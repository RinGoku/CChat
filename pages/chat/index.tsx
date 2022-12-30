"use client";
import "firebase/messaging";
import { getToken } from "firebase/messaging";
import { messaging } from "firebase";
import Link from "next/link";
import { trpc } from "utils/trpc";
import { useGetTokenFCM } from "components/chat/useGetTokenFCM";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { firebaseCloudMessaging } from "utils/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { CCChatInput } from "components/input/CCChatInput";
import { useInput } from "hooks/common/useInput";
import { Button } from "@mantine/core";
import { showCCNotification } from "components/common/helper/CCNotification";
import { GetServerSideProps } from "next";
import { verifyTokenOnServerRender } from "server/auth/verifyTokens";

const Chat = () => {
  const router = useRouter();
  const chat = useInput("");
  const chats = trpc.chats.useQuery({
    channelId: 1,
  })?.data?.chats;
  const updateDeviceToken = trpc.updateDeviceToken.useMutation();
  useEffect(() => {
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
          await updateDeviceToken.mutateAsync({
            deviceToken: token,
          });
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
  const context = trpc.useContext();
  const sendChat = trpc.createChat.useMutation({
    onSuccess: () => {
      context.chats.invalidate({
        channelId: 1,
      });
    },
  });
  const send = useCallback(async () => {
    const res = await sendChat.mutateAsync({
      text: chat.value,
      channelId: 1,
    });
    if (res.chat) {
      showCCNotification({
        message: "チャットを送信しました",
        type: "success",
      });
    }
  }, [sendChat]);
  return (
    <div>
      {chats?.map((c) => (
        <div>{c.text}</div>
      ))}
      <CCChatInput {...chat} />
      <Button onClick={send}>送信</Button>
    </div>
  );
};

export default Chat;
