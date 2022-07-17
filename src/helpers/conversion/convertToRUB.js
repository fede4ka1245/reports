import { formatRatesXMLtoMap } from "./formatRatesXMLtoMap";
import { cachedRequestRatesXML } from "@/api/cachedRequests";

export const convertToRUB = async (sum, code, day, month, year) => {
  const ratesXML = await cachedRequestRatesXML(day, month, year);

  if (!ratesXML) {
    return undefined;
  }

  const rates = formatRatesXMLtoMap(ratesXML);

  if (!rates[code]) {
    return undefined;
  }

  const { value, nominal } = rates[code];

  return ((sum * value) / nominal).toFixed(2);
};
