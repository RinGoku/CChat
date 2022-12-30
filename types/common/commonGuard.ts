import { PreconditionError } from "types/common/error";

export const isString = (v: unknown): v is string => {
  return typeof v === "string";
};

export function assertString(v: unknown, target = ""): asserts v is string {
  if (!isString(v)) {
    throw new PreconditionError(`${target} should be string`.trim());
  }
}

export const asString = (v: unknown, target = ""): string => {
  assertString(v, target);
  return v;
};
