export const getFormattedCurrentDate = () => {
  const date = new Date();

  const day = format(date.getDate());
  const month = format(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const format = (date) => {
  if (String(date).length === 1) {
    return `0${date}`;
  }
  return date;
};
