export const setItem = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};
