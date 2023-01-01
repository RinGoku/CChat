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

export const parseJSONSafe = (target: string) => {
  try {
    const json = JSON.parse(target);
    return json;
  } catch (e) {
    return target;
  }
};

export const stringifyJSONAsync = async <T>(target: unknown) => {
  return await new Promise<T>((resolve, reject) => {
    try {
      const json = JSON.stringify(target);
      resolve(json as T);
    } catch (e) {
      reject(e);
    }
  }).catch(() => target);
};

export const stringifyJSONSafe = (target: unknown) => {
  try {
    const json = JSON.stringify(target);
    return json;
  } catch (e) {
    return target;
  }
};
