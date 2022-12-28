import { PrismaClient } from "@prisma/client";
import { errorCodeMap } from "error/code";
import { NextApiHandler, NextApiResponse } from "next";
import { setCookie, parseCookies } from "nookies";
import { cookieIdMap } from "server/cookie";
import { isEmpty } from "types/common/empty";
const prisma = new PrismaClient();

const getCoupleId = async (coupleId: number | undefined) => {
  if (isEmpty(coupleId)) {
    const result = await prisma.couple.create({
      data: {},
    });
    return result.id;
  }
  return coupleId;
};

const handler: NextApiHandler = async (req, res) => {
  const parsedCookies = parseCookies({ req });
  const { name, gender, birthDay, coupleId } = JSON.parse(req.body);
  const useCoupleId = await getCoupleId(coupleId);
  const createdUser = await prisma.user.create({
    data: {
      name,
      gender,
      birthDay,
      firebaseId: parsedCookies[cookieIdMap.uid],
      couple: {
        connect: {
          id: useCoupleId,
        },
      },
    },
  });
  res.status(200).json({ status: "ok", user: createdUser });
};

export default handler;
