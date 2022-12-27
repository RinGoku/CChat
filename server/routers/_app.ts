import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { procedure, router } from "../trpc";

const prisma = new PrismaClient();

export const appRouter = router({
  channels: procedure
    .input(
      z.object({
        coupleId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return {
        channels: await prisma.channel.findMany({
          where: { coupleId: input.coupleId },
        }),
      };
    }),
  chats: procedure
    .input(
      z.object({
        channelId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return {
        channels: await prisma.chat.findMany({
          where: { channelId: input.channelId },
        }),
      };
    }),
});

export type AppRouter = typeof appRouter;
