import { Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useCallback } from "react";
import { cookieIdMap } from "server/cookie";
import { trpc } from "utils/trpc";

const MyPage = () => {
  const mutation = trpc.signOut.useMutation();
  const router = useRouter();
  const logout = useCallback(async () => {
    await mutation.mutateAsync();
    router.push("/auth/signin");
  }, []);
  const result = trpc.user.useQuery();
  return (
    <div>
      {result?.data?.user?.name}
      <Button onClick={logout}>ログアウト</Button>
      <Link href="/channels">Channel</Link>
      <Link href="/chat">Chat</Link>
    </div>
  );
};

export default MyPage;
