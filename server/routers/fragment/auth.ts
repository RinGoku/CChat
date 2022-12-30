import { deleteSessionOnAuth } from "server/auth/deleteSessionOnAuth";
import { TRPCError } from "@trpc/server";
import { errorCodeMap, errorCodeToMessage } from "error/code";
import { asignSessionOnAuth } from "server/auth/asignSessionOnAuth";
import { procedure } from "server/trpc";
import { signupSchema } from "types/form/signup";

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

const confirmMail = async (token: string) => {
  const body = JSON.stringify({ requestType: "VERIFY_EMAIL", idToken: token });
  const apiKey = process.env.FIREBASE_API_KEY;
  return await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

export const authFragment = {
  signUp: procedure
    .input(signupSchema)
    .mutation(async ({ input, ctx: { res } }) => {
      const { email, password } = input;
      const response = await signUp(email, password);
      if (!response.ok) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: errorCodeToMessage["auth/registered-email"],
        });
      }
      const { idToken, ...rest } = await response.json();
      const confirmedEmail = await confirmMail(idToken);
      if (!confirmedEmail.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorCodeToMessage["auth/failed-confirm-email"],
        });
      }
      asignSessionOnAuth(res, idToken, rest.localId, rest.refreshToken, email);
    }),

  signIn: procedure
    .input(signupSchema)
    .mutation(async ({ input, ctx: { res } }) => {
      const { email, password } = input;
      const response = await signIn(email, password);
      if (!response.ok) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: errorCodeToMessage["auth/failed-signin"],
        });
      }
      const { idToken, ...rest } = await response.json();
      asignSessionOnAuth(res, idToken, rest.localId, rest.refreshToken, email);
    }),
  signOut: procedure.mutation(async ({ ctx: { res, cookie } }) => {
    console.log("signOut", cookie);
    deleteSessionOnAuth(res);
  }),
};
