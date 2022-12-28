import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultGetServerSideProps } from "server/auth/setting";
import { verifyTokenOnServerRender } from "server/auth/verifyTokens";
import { trpc } from "utils/trpc";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return (
    (await verifyTokenOnServerRender(req, res)) ?? defaultGetServerSideProps
  );
};

const Channel = () => {
  const { data: channels } = trpc.channels.useQuery({ coupleId: 1 });
  return (
    <div>
      {channels?.channels.map((c) => c.name)}
      <Link href="/">Go home</Link>
    </div>
  );
};

export default Channel;
