import { parseCookies, setCookie } from "nookies";
import { commonCookieOptions, cookieIdMap } from "server/cookie";
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

export const verifyTokenOnServerRender = async (req, res) => {
  const cookies = parseCookies({ req });
  const response = await verifyTokens(cookies[cookieIdMap.session]);
  // verifyに失敗した時はsigninへリダイレクト
  if (!response.ok) {
    const token = await refreshTokens(cookies[cookieIdMap.refreshToken]);
    if (!token.ok) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }
    setCookie(
      { res },
      cookieIdMap.refreshToken,
      await token.json()["id_token"],
      commonCookieOptions
    );
  }

  return undefined;
};
