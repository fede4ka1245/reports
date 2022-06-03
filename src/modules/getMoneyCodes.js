import * as currencyCodes from "currency-codes";

export const getMoneyCodes = () => {
  return currencyCodes.codes();
};
