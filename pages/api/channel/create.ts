import { PrismaClient } from "@prisma/client";
import { errorCodeMap } from "error/code";
import { NextApiHandler, NextApiResponse } from "next";
import { setCookie, parseCookies } from "nookies";
import { cookieIdMap } from "server/cookie";
import { isEmpty } from "types/common/empty";

const prisma = new PrismaClient();
const handler: NextApiHandler = async (req, res) => {
  const parsedCookies = parseCookies({ req });
  const { name } = JSON.parse(req.body);
  const user = await prisma.user.findMany({
    where: {
      firebaseId: parsedCookies[cookieIdMap.uid],
    },
  });
  const createdUser = await prisma.channel.create({
    data: {
      name,
      couple: {
        connect: {
          id: user[0].coupleId,
        },
      },
    },
  });
  res.status(200).json({ status: "ok", user: createdUser });
};

export default handler;
