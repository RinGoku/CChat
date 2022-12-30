import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenOnServerRender } from "server/auth/verifyTokens";
import { commonCookieOptions, cookieIdMap } from "server/cookie";
import { checkCreatedUser } from "server/auth/checkCreatedUser";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const result = await verifyTokenOnServerRender(request.cookies);
  const res = NextResponse.next();
  if (result) {
    res.cookies.set(
      cookieIdMap.session,
      JSON.stringify({ [cookieIdMap.session]: result }),
      commonCookieOptions
    );
    return res;
  }
  const resRedirect = NextResponse.redirect(
    new URL("/auth/signin", request.url)
  );
  resRedirect.cookies
    .delete(cookieIdMap.session)
    .delete(cookieIdMap.uid)
    .delete(cookieIdMap.refreshToken)
    .delete(cookieIdMap.email);
  return resRedirect;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/channels/:path*",
    "/chat/:path*",
    "/mypage",
    "/mypage/:path*",
    "/auth/createUser",
  ],
};
