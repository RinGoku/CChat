import { PrismaClient } from "@prisma/client";
import { cookieIdMap } from "server/cookie";
import { parseCookiesCC } from "utils/adaptors/nookies";

const prisma = new PrismaClient();
export const checkCreatedUser = async (req, destination: string) => {
  const parsedCookies = parseCookiesCC({ req });
  const uid = parsedCookies[cookieIdMap.uid];
  if (!uid) {
    return undefined;
  }
  const user = await prisma.user.findMany({
    where: {
      firebaseId: uid,
    },
  });
  if (user.length === 0) {
    return {
      redirect: {
        destination: "/auth/createUser",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};
