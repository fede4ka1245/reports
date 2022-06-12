export const getItem = (key) => {
  if (localStorage.getItem(key)) {
    return undefined;
  }

  return JSON.parse(localStorage.getItem(key));
};
