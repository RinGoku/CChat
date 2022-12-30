export const parseJSONAsync = async <T>(target: string) => {
  return await new Promise<T>((resolve, reject) => {
    try {
      const json = JSON.parse(target);
      resolve(json as T);
    } catch (e) {
      reject(e);
    }
  }).catch(() => target);
};

export const parseJSONSafe = async <T>(target: string) => {
  try {
    const json = JSON.parse(target);
    return json;
  } catch (e) {
    return target;
  }
};
