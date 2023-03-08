import { getHikeReport } from "@/helpers/excel/reports/getHikeReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";
import { getHikeReportName } from "@/helpers/reports/getHikeReportName";

export const downloadHikeReport = async (report) => {
  const targetReport = await getHikeReport(report);

  await downloadXLSX(targetReport, getHikeReportName(report));
};
