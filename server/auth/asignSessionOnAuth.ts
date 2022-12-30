import { NextApiResponse } from "next";
import { cookieIdMap, commonCookieOptions } from "server/cookie";
import { setCookieCC } from "utils/adaptors/nookies";

export const asignSessionOnAuth = (
  res: NextApiResponse,
  idToken: string,
  uid: string,
  refreshToken: string,
  email: string
) => {
  setCookieCC({ res }, cookieIdMap.session, idToken, commonCookieOptions);
  setCookieCC({ res }, cookieIdMap.uid, uid, commonCookieOptions);
  setCookieCC(
    { res },
    cookieIdMap.refreshToken,
    refreshToken,
    commonCookieOptions
  );
  setCookieCC({ res }, cookieIdMap.email, email, commonCookieOptions);
};
