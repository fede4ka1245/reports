import isOnline from "is-online";

export const hasInternetConnection = async () => {
  return await isOnline();
};
