"use client";
import "firebase/messaging";
import { trpc } from "utils/trpc";
import { FC, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { firebaseCloudMessaging } from "utils/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { CCChatInput } from "components/input/CCChatInput";
import { useInput } from "hooks/common/useInput";
import { Button } from "@mantine/core";
import { showCCNotification } from "components/common/helper/CCNotification";
import styled from "@emotion/react";

type ChatProps = {
  channelId: number;
  className: any;
};

const Chat: FC<ChatProps> = ({ channelId, ...rest }) => {
  const router = useRouter();
  const chat = useInput("");
  const chats = trpc.chats.useQuery({
    channelId,
  })?.data?.chats;
  const user = trpc.user.useQuery()?.data?.user;
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
        channelId,
      });
    },
  });
  const send = useCallback(async () => {
    const res = await sendChat.mutateAsync({
      text: chat.value,
      channelId,
    });
    if (res.chat) {
      showCCNotification({
        message: "チャットを送信しました",
        type: "success",
      });
    }
  }, [sendChat]);
  return (
    <div {...rest} className="grow relative py-2 h-screen">
      <div
        id="messages"
        className="overflow-auto h-[calc(100vh_-_60px)] flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {chats?.map((c) =>
          c.userId === user.id ? (
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#90adff] text-white ">
                      {c.text}
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                />
              </div>
            </div>
          ) : (
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      {c.text}
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex items-center	gap-x-4 px-4 absolute z-10 bottom-4 right-0 w-full">
        <CCChatInput {...chat} className="grow" />
        <Button onClick={send}>送信</Button>
      </div>
    </div>
  );
};

const Wrapper = styled;

export default Chat;
