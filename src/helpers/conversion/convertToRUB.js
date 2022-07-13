import { formatRatesXMLtoMap } from "./formatRatesXMLtoMap";
import { cachedRequestRatesXML } from "@/api/cachedRequests";

export const convertToRUB = async (sum, code, day, month, year) => {
  const ratesXML = await cachedRequestRatesXML(day, month, year);
  const rates = formatRatesXMLtoMap(ratesXML);

  const { value, nominal } = rates[code];

  return ((sum * value) / nominal).toFixed(2);
};
