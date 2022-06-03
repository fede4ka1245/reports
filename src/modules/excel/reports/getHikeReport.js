import ExcelJS from "exceljs";
import { groupExpenses } from "@/modules/groupExpenses";
import {
  setConversions,
  setExpenses,
  setHikeInformation,
  setCommonPayments,
  setOutgoingPayments,
  setIncomingPayments,
  setGroupedExpenses,
} from "@/modules/excel/sheetDataSetters";

import { styleSheet } from "@/modules/excel/helpers";
import { Directory } from "@capacitor/filesystem";
import { writeFile } from "capacitor-blob-writer";

export const getHikeReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("отчёт", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  setHikeInformation(sheet, reportData);
  setOutgoingPayments(sheet, reportData.outgoingPayments);

  styleSheet(sheet);

  const incomingPaymentsSheet = workbook.addWorksheet("Сборы", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  setCommonPayments(incomingPaymentsSheet, reportData.commonPayments);
  setIncomingPayments(incomingPaymentsSheet, reportData.incomingPayments);

  styleSheet(incomingPaymentsSheet);

  const expensesSheet = workbook.addWorksheet("Расходы", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  setGroupedExpenses(expensesSheet, groupExpenses(reportData.expenses));
  setExpenses(expensesSheet, reportData.expenses);
  setConversions(expensesSheet, reportData.conversions);

  styleSheet(expensesSheet);

  return workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "report.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);

    writeFile({
      path: "Documents/report.xlsx",
      data: blob,
      directory: Directory.ExternalStorage,
    });
  });
};
