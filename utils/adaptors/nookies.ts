import { parseCookies, setCookie } from "nookies";
import { commonCookieOptions, cookieIdMap } from "server/cookie";

type SetCookieParams = Parameters<typeof setCookie>;

export const setCookieCC = (...args: SetCookieParams) => {
  const [ctx, name, value, options] = args;
  setCookie(ctx, name, JSON.stringify({ [name]: value }), options);
};

type ParseCookieParams = Parameters<typeof parseCookies>;
export const parseCookiesCC = (...args: ParseCookieParams) => {
  const parsedCookies = parseCookies(args[0]);
  return Object.entries(parsedCookies).reduce((acc, [key, value]) => {
    try {
      return { ...acc, [key]: JSON.parse(value)[key] };
    } catch (error) {
      return { ...acc, [key]: value };
    }
  }, {} as Record<string, string>);
};
