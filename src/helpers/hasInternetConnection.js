import { Network } from "@capacitor/network";

export const hasInternetConnection = async () => {
  return (await Network.getStatus()).connected;
};
