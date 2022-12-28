import { errorCodeMap } from "error/code";
import { NextApiHandler, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { asignSessionOnAuth } from "server/auth/asignSessionOnAuth";
import { commonCookieOptions, cookieIdMap } from "server/cookie";

const signIn = async (email: string, password: string) => {
  const body = JSON.stringify({ email, password, returnSecureToken: true });
  const apiKey = process.env.FIREBASE_API_KEY;
  return await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = JSON.parse(req.body);
  const response = await signIn(email, password);
  if (!response.ok) {
    res.status(401).json({ code: errorCodeMap["auth/registered-email"] });
    return;
  }
  const { idToken, ...rest } = await response.json();
  asignSessionOnAuth(res, idToken, rest.localId, rest.refreshToken, email);
  res.status(200).json({ status: "ok" });
};

export default handler;
