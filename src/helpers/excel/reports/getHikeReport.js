import ExcelJS from "exceljs";
import { groupExpenses } from "@/helpers/reports/groupExpenses";
import {
  setConversions,
  setExpenses,
  setHikeInformation,
  setCommonPayments,
  setPayments,
  setGroupedExpenses,
} from "@/helpers/excel/sheetDataSetters";

import { styleSheet } from "@/helpers/excel/helpers";
import { setPadding } from "@/helpers/excel/helpers/setPadding";

export const getHikeReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Отчёт", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  setHikeInformation(sheet, reportData);
  setPayments(sheet, reportData.outgoingPayments);

  styleSheet(sheet);

  const incomingPaymentsSheet = workbook.addWorksheet("Сборы", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  setCommonPayments(incomingPaymentsSheet, reportData.moneySums);
  setPadding(incomingPaymentsSheet);
  setPayments(incomingPaymentsSheet, reportData.incomingPayments);

  styleSheet(incomingPaymentsSheet);

  const expensesSheet = workbook.addWorksheet("Расходы", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  setGroupedExpenses(expensesSheet, groupExpenses(reportData.expenses));
  setPadding(expensesSheet);
  setExpenses(expensesSheet, reportData.expenses);
  setPadding(expensesSheet);
  setConversions(expensesSheet, reportData.conversions);

  styleSheet(expensesSheet);

  return workbook.xlsx.writeBuffer();
};
