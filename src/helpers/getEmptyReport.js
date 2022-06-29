import { currentReport } from "./reports/currentReport";
import { nanoid } from "nanoid";

export const getEmptyReport = () => {
  const report = currentReport;
  report.key = nanoid();

  return report;
};
