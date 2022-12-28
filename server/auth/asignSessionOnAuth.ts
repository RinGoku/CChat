import { NextApiResponse } from "next";
import { setCookie } from "nookies";
import { cookieIdMap, commonCookieOptions } from "server/cookie";

export const asignSessionOnAuth = (
  res: NextApiResponse,
  idToken: string,
  uid: string,
  refreshToken: string,
  email: string
) => {
  setCookie({ res }, cookieIdMap.session, idToken, commonCookieOptions);
  setCookie({ res }, cookieIdMap.uid, uid, commonCookieOptions);
  setCookie(
    { res },
    cookieIdMap.refreshToken,
    refreshToken,
    commonCookieOptions
  );
  setCookie({ res }, cookieIdMap.email, email, commonCookieOptions);
};
