import { TRPCError, initTRPC, inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { parseCookiesCC } from "utils/adaptors/nookies";

export const CreateCookieAppContext = async (
  opts?: CreateNextContextOptions
) => {
  // 本来は認証など色々共通処理を行う
  const cookie = parseCookiesCC({ req: opts?.req });
  return {
    cookie,
    req: opts?.req,
    res: opts?.res,
  };
};

export type CookieAppContext = inferAsyncReturnType<
  typeof CreateCookieAppContext
>;

const t = initTRPC.context<CookieAppContext>().create();

export const router = t.router;
export const procedure = t.procedure;
