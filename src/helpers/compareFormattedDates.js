export const compareFormattedDates = (firstDate, secondDate) => {
  if (firstDate === secondDate) {
    return 0;
  }

  const [firstDateDay, firstDateMonth, firstDateYear] = firstDate.split(".");
  const [secondDateDay, secondDateMonth, secondDateYear] = secondDate.split(".");

  if (
    Number(firstDateYear) > Number(secondDateYear) ||
    (Number(firstDateYear) === Number(secondDateYear) &&
      Number(firstDateMonth) > Number(secondDateMonth)) ||
    (Number(firstDateYear) === Number(secondDateYear) &&
      Number(firstDateMonth) === Number(secondDateMonth) &&
      Number(firstDateDay) > Number(secondDateDay))
  ) {
    return 1;
  } else {
    return -1;
  }
};
