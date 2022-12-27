import { Brand } from "types/brand";
import { isString } from "types/commonGuard";
import { PreconditionError } from "types/error";

// type Brand<K, T> = K & { __brand: T };
export type FilledString = Brand<string, "FilledString">;

function isFilledString(v: unknown): v is FilledString {
  return isString(v) && v !== "";
}

type AssertFilledString = (
  v: unknown,
  target?: string
) => asserts v is FilledString;
export const assertFilledString: AssertFilledString = (
  v: unknown,
  target = ""
) => {
  if (!isFilledString(v)) {
    throw new PreconditionError(`${target} should be not empty string`.trim());
  }
};

export const asFilledString = (v: unknown, target = ""): FilledString => {
  assertFilledString(v, target);
  return v;
};
