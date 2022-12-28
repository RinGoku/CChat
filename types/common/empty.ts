export const isEmpty = (target: unknown): target is undefined | null => {
  return target === undefined || target === null;
};
