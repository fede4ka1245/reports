import {store} from "@/store/store";
import {getMainReport} from "@/helpers/excel/reports/getMainReport";
import {downloadXLSX} from "@/helpers/downloadXLSX";
import {sendFileDownloadedNotification} from "@/helpers/notifications/sendFileDownloadedNotification";

export const downloadMainReport = async () => {
  const reportData = JSON.parse(JSON.stringify(store.allReports));
  if (store.currentReport) {
    reportData.reports.push(store.currentReport)
  }

  const xlsx = await getMainReport(reportData);
  const {path, directory, mimeType} = await downloadXLSX(xlsx, "Общий");
  sendFileDownloadedNotification("Общий", "Загружен отчет", path, directory, mimeType)
};