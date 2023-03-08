export const getRatesXML = async (day, month, year) => {
  if (process.env.NODE_ENV === "development") {
    return await fetch(
      `https://www.cbr.ru/scripts/XML_daily.asp?date_req=${day}/${month}/${year}`,
      {
        method: "GET"
      }
    ).then((res) => {
      return res.text();
    });
  }

  return fetch(`/api/server-cbr?date_req=${day}/${month}/${year}`, {
    method: "GET",
  }).then((res) => {
    return res.text();
  });
};
