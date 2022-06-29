import { getHikeReport } from "@/helpers/excel/reports/getHikeReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";
import { FileOpener } from '@awesome-cordova-plugins/file-opener/';
import {sendFileDownloadedNotification} from "@/helpers/notifications/sendFileDownloadedNotification";

export const downloadHikeReport = async (report) => {
  const targetReport = await getHikeReport(report);

  const {path, directory, mimeType} = await downloadXLSX(targetReport, report.name);

  sendFileDownloadedNotification(report.name, "отчет загружен", path, directory, mimeType)
};
