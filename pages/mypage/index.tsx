import { PrismaClient } from "@prisma/client";
import { User } from "interfaces";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { cookieIdMap } from "server/cookie";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const parsedCookies = parseCookies({ req });
  const uid = parsedCookies[cookieIdMap.uid];
  if (!uid) {
    return undefined;
  }
  const user = await prisma.user.findMany({
    where: {
      firebaseId: uid,
    },
  });
  console.log(user);
  return {
    props: {
      user: JSON.stringify(user[0]),
    },
  };
};

const MyPage = ({ user: userJson }) => {
  const user = JSON.parse(userJson);
  return <div>{user.name}</div>;
};

export default MyPage;
