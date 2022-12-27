import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";

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
