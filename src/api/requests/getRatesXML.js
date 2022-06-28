import { Http } from "@capacitor-community/http";

export const getRatesXML = async (day, month, year) => {
  const ratesResponse = await Http.get({
    url: `https://www.cbr.ru/scripts/XML_daily.asp?date_req=${day}/${month}/${year}`,
  });
  return await ratesResponse.data;
};
