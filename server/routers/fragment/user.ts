import { cookieIdMap } from "server/cookie";
import { prisma } from "server/prisma";
import { procedure } from "server/trpc";
import { isEmpty } from "types/common/empty";
import { z } from "zod";

const getCoupleId = async (pairEmail: string | undefined) => {
  if (isEmpty(pairEmail)) {
    const result = await prisma.couple.create({
      data: {},
    });
    return result.id;
  }
  const user = await prisma.user.findMany({
    where: {
      email: pairEmail,
    },
  });
  return user[0]?.coupleId;
};

export const userFragment = {
  user: procedure.query(async ({ ctx: { cookie } }) => {
    const uid = cookie[cookieIdMap.uid];
    const user = await prisma.user.findMany({
      where: { firebaseId: uid },
    });
    return { user: user[0] };
  }),
  createUser: procedure
    .input(
      z.object({
        name: z.string(),
        gender: z.string(),
        birthDay: z.date(),
        pairEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ input, ctx: { cookie } }) => {
      const { name, gender, birthDay, pairEmail } = input;
      const useCoupleId = await getCoupleId(pairEmail);
      const createdUser = await prisma.user.create({
        data: {
          name,
          gender,
          birthDay,
          firebaseId: cookie[cookieIdMap.uid],
          email: cookie[cookieIdMap.email],
          couple: {
            connect: {
              id: useCoupleId,
            },
          },
        },
      });
      return { user: createdUser };
    }),
  updateDeviceToken: procedure
    .input(
      z.object({
        deviceToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { cookie } }) => {
      const { deviceToken } = input;
      const uid = cookie[cookieIdMap.uid];
      const user = await prisma.user.findMany({
        where: { firebaseId: uid },
      });
      const updatedUser = await prisma.user.update({
        where: {
          id: user[0].id,
        },
        data: {
          deviceToken: deviceToken,
        },
      });
      return { user: updatedUser };
    }),
};
