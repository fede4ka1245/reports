import { getHikeReport } from "@/helpers/excel/reports/getHikeReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";

export const downloadHikeReport = async (report) => {
  const targetReport = await getHikeReport(report);

  downloadXLSX(targetReport, report?.name || "report");
};
