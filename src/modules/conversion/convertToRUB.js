import { formatRatesXMLtoMap } from "./formatRatesXMLtoMap";
import { getRatesXML } from "@/api/getRatesXML";

export const convertToRUB = async (sum, code, day, month, year) => {
  const ratesXML = await getRatesXML(day, month, year);
  const rates = formatRatesXMLtoMap(ratesXML);

  const { value, nominal } = rates[code];

  return (sum * value) / nominal;
};
