import { getHikeReport } from "@/helpers/excel/reports/getHikeReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";
import { FileOpener } from "@awesome-cordova-plugins/file-opener/";
import { sendFileDownloadedNotification } from "@/helpers/notifications/sendFileDownloadedNotification";
import { getHikeReportName } from "@/helpers/reports/getHikeReportName";

export const downloadHikeReport = async (report) => {
  const targetReport = await getHikeReport(report);

  const { path, directory, mimeType } = await downloadXLSX(
    targetReport,
    getHikeReportName(report)
  );

  sendFileDownloadedNotification(
    getHikeReportName(report),
    "отчет загружен",
    path,
    directory,
    mimeType
  );
};
