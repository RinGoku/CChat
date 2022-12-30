import { User } from "interfaces";
import { atom } from "jotai";

export const userAtom = atom<User | undefined>(undefined);
