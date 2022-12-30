import { NextApiResponse } from "next";
import { destroyCookie } from "nookies";
import { cookieIdMap } from "server/cookie";

export const deleteSessionOnAuth = (res: NextApiResponse) => {
  destroyCookie({ res }, cookieIdMap.session, { path: "/" });
  destroyCookie({ res }, cookieIdMap.uid, { path: "/" });
  destroyCookie({ res }, cookieIdMap.refreshToken, { path: "/" });
  destroyCookie({ res }, cookieIdMap.email, { path: "/" });
};
