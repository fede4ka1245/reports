import { store } from "@/store/store";
import { getMainReport } from "@/helpers/excel/reports/getMainReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";
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

  await downloadXLSX(xlsx, "Общий отчет");
};
