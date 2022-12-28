import { PrismaClient } from "@prisma/client";
import { errorCodeMap } from "error/code";
import { NextApiHandler, NextApiResponse } from "next";
import { setCookie, parseCookies } from "nookies";
import { cookieIdMap } from "server/cookie";
import { isEmpty } from "types/common/empty";

const prisma = new PrismaClient();
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

const handler: NextApiHandler = async (req, res) => {
  const parsedCookies = parseCookies({ req });
  const { name, gender, birthDay, coupleId, pairEmail } = JSON.parse(req.body);
  const useCoupleId = await getCoupleId(pairEmail);
  const createdUser = await prisma.user.create({
    data: {
      name,
      gender,
      birthDay,
      firebaseId: parsedCookies[cookieIdMap.uid],
      email: parsedCookies[cookieIdMap.email],
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
