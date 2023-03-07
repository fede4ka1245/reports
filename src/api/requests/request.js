export const request = async (url) => {
  let username = process.env.VUE_APP_API_USERNAME;
  let password = process.env.VUE_APP_API_PASSWORD;

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
