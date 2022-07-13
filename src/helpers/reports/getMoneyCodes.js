import { getRates } from "@/helpers/reports/getRates";

export const getMoneyCodes = () => {
  return Array.from(Object.keys(getRates()));
};
