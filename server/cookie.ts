export const cookieId = ["session", "uid", "refreshToken"] as const;

export const cookieIdMap = Object.fromEntries(
  cookieId.map((code) => [code, code])
) as { [k in typeof cookieId[number]]: k };

export const commonCookieOptions = {
  maxAge: 60 * 60 * 24, // 1日
  httpOnly: true,
  secure: true,
  path: "/",
};
