import { getItem, setItem } from "@/helpers/localStorage";

export const cachedRequest = (requestFunction, key) => {
  return async (...args) => {
    const $key = key + args?.join("");
    try {
      const result = await requestFunction.apply(this, args);
      setItem($key, result);
      return result;
    } catch (error) {
      if (getItem($key)) {
        return getItem($key);
      }

      throw error;
    }
  };
};
