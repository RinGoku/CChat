import { NextApiHandler, NextApiResponse } from "next";
import { setCookie } from "nookies";

const signUp = async (email: string, password: string) => {
  const body = JSON.stringify({ email, password, returnSecureToken: true });
  const apiKey = process.env.FIREBASE_API_KEY;
  return await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

const assignSession = (res: NextApiResponse, idToken: string) => {
  const SESSION_KEY = "session";
  const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24, // 1日
    httpOnly: true,
    secure: true,
    path: "/",
  };
  setCookie({ res }, SESSION_KEY, idToken, COOKIE_OPTIONS);
};

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  const response = await signUp(email, password);
  if (!response.ok) {
    throw new Error("認証エラー");
  }
  const { idToken } = await response.json();
  assignSession(res, idToken);

  res.json({ status: "ok" });
};

export default handler;
