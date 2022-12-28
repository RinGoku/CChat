import { errorCodeMap } from "error/code";

export type ErrorInfo = {
  code: typeof errorCodeMap[keyof typeof errorCodeMap];
};

export const isErrorInfo = (v: unknown): v is ErrorInfo => {
  return typeof v === "object" && v !== null && "code" in v;
};

export function assertErrorInfo(v: unknown): asserts v is ErrorInfo {
  if (!isErrorInfo(v)) {
    throw new Error("v should be ErrorInfo");
  }
}

export const asErrorInfo = (v: unknown): ErrorInfo => {
  assertErrorInfo(v);
  return v;
};
