export const getRatesXML = async (day, month, year) => {
  const ratesResponse = await fetch(`/api/server-cbr?date_req=${day}/${month}/${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      }
    })
      .then((res) => {
        console.log(res);
        return res.text();
      });

  console.log(ratesResponse);

  return ratesResponse;
};