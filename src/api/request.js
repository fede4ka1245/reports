export const request = async (url) => {
  let username = "appuser";
  let password = "rRDFazvmtVuQ4W6W";

  let headers = new Headers();

  headers.append(
    "Authorization",
    "Basic " + window.btoa(username + ":" + password)
  );

  return fetch(url, {
    method: "GET",
    headers,
  }).then((response) => response.json());
};
