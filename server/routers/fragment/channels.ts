import { cookieIdMap } from "server/cookie";
import { prisma } from "server/prisma";
import { procedure } from "server/trpc";
import { z } from "zod";

export const channelFragment = {
  channels: procedure.query(async ({ input, ctx: { cookie } }) => {
    const uid = cookie[cookieIdMap.uid];
    const user = await prisma.user.findMany({
      where: { firebaseId: uid },
    });
    return {
      channels: await prisma.channel.findMany({
        where: { coupleId: user[0].coupleId },
      }),
    };
  }),
  createChannels: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { cookie } }) => {
      const uid = cookie[cookieIdMap.uid];
      const user = await prisma.user.findMany({
        where: { firebaseId: uid },
      });
      const createdChannel = await prisma.channel.create({
        data: {
          name: input.name,
          couple: {
            connect: {
              id: user[0].coupleId,
            },
          },
        },
      });
      return {
        channels: createdChannel,
      };
    }),
};
