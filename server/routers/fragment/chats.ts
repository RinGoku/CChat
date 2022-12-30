import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import { cookieIdMap } from "server/cookie";
import { prisma } from "server/prisma";
import { procedure } from "server/trpc";
import { z } from "zod";
import * as firebaseAdmin from "firebase-admin";
import "../../../server/firebase";
import { isEmpty } from "types/common/empty";

const sendMessage = async (
  chat: string,
  tokens: string[]
): Promise<BatchResponse> => {
  const params = {
    notification: {
      title: "テストタイトル",
      body: chat,
    },
    tokens,
  };

  return await firebaseAdmin.messaging().sendMulticast(params);
};

export const chatFragment = {
  chats: procedure
    .input(
      z.object({
        channelId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return {
        chats: await prisma.chat.findMany({
          where: { channelId: input.channelId },
        }),
      };
    }),
  createChat: procedure
    .input(
      z.object({
        text: z.string(),
        channelId: z.number(),
      })
    )
    .mutation(async ({ input, ctx: { cookie } }) => {
      const uid = cookie[cookieIdMap.uid];
      const user = await prisma.user.findMany({
        where: { firebaseId: uid },
      });
      const targetChannel = await prisma.channel.findUnique({
        where: { id: input.channelId },
      });
      if (!targetChannel) {
        throw new Error(`id${input.channelId}は存在しないチャンネルIDです`);
      }
      const targetCoupleId = targetChannel.coupleId;
      const users = await prisma.user.findMany({
        where: { coupleId: targetCoupleId },
      });
      const createdChat = await prisma.chat.create({
        data: {
          text: input.text,
          user: {
            connect: {
              id: user[0].id,
            },
          },
          channel: {
            connect: {
              id: input.channelId,
            },
          },
        },
      });
      const result = await sendMessage(
        input.text,
        users.reduce((accum, user) => {
          if (!isEmpty(user.deviceToken)) {
            accum.push(user.deviceToken);
          }
          return accum;
        }, [])
      );
      console.log(result.responses);
      return {
        chat: createdChat,
      };
    }),
};
