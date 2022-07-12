export const getHikeReportName = (report) => {
  let labelDate;
  const startDate = report.dates.split("-")[0];
  const endDate = report.dates.split("-")[1];

  if (startDate[0].split(".")[2] === endDate[1].split(".")[2]) {
    labelDate = startDate.substring(0, 5) + "-" + endDate;
  } else {
    labelDate = report.dates;
  }

  const formattedName = report.name.replace(/[.*+?:^${}()|[\]\\]/g, "");

  return `${labelDate} (${formattedName})`;
};
