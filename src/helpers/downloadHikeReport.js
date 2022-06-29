import { getHikeReport } from "@/helpers/excel/reports/getHikeReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";
import { FileOpener } from '@awesome-cordova-plugins/file-opener/';
import { xlsxMimeType } from "@/helpers/xlsxMimeType";
import {sendFileDownloadedNotification} from "@/helpers/notifications/sendFileDownloadedNotification";

export const downloadHikeReport = async (report) => {
  const targetReport = await getHikeReport(report);

  const {path, directory} = await downloadXLSX(targetReport, report.name);

  sendFileDownloadedNotification(report.name, "file was loaded", path, directory, xlsxMimeType)
};
