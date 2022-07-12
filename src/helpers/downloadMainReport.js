import { store } from "@/store/store";
import { getMainReport } from "@/helpers/excel/reports/getMainReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";
import { sendFileDownloadedNotification } from "@/helpers/notifications/sendFileDownloadedNotification";
import { hasInternetConnection } from "@/helpers/hasInternetConnection";

export const downloadMainReport = async () => {
  if (!(await hasInternetConnection())) {
    alert("Для скачивания отчета нужен интернет");
    return;
  }

  const reportData = JSON.parse(JSON.stringify(store.allReports));
  if (store.currentReport) {
    reportData.reports.push(store.currentReport);
  }

  const xlsx = await getMainReport(reportData);
  const { path, directory, mimeType } = await downloadXLSX(xlsx, "Общий отчет");
  sendFileDownloadedNotification(
    "Общий отчет",
    "Загружен общий отчет",
    path,
    directory,
    mimeType
  );
};
