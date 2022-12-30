import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { cookieIdMap } from "server/cookie";
import { parseJSONAsync } from "utils/adaptors/json";
export const verifyTokens = async (idToken: string) => {
  const apiKey = process.env.FIREBASE_API_KEY;
  const body = JSON.stringify({ idToken });
  return await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

export const refreshTokens = async (token: string) => {
  const apiKey = process.env.FIREBASE_API_KEY;
  const body = JSON.stringify({
    refresh_token: token,
    grant_type: "refresh_token",
  });
  return await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

export const verifyTokenOnServerRender = async (cookies: RequestCookies) => {
  const idToken = (
    await parseJSONAsync(cookies.get(cookieIdMap.session)?.["value"])
  )?.[cookieIdMap.session];
  console.log(cookies, idToken);
  const response = await verifyTokens(idToken);
  // verifyに失敗した時はsigninへリダイレクト
  console.log(response.ok);
  if (!response.ok) {
    const token = await refreshTokens(
      (
        await parseJSONAsync(cookies.get(cookieIdMap.refreshToken)?.["value"])
      )?.[cookieIdMap.refreshToken]
    );
    if (!token.ok) {
      return false;
    }

    return await token.json()["id_token"];
  }

  return idToken;
};
