import { atom } from "jotai";
import { SignUpSchema } from "types/form/signup";

export const signupEmail = atom<SignUpSchema["email"]>("");
export const signupPassword = atom<SignUpSchema["password"]>("");
