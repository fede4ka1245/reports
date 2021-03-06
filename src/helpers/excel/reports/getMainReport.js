import ExcelJS from "exceljs";
import { createHeaderCell, styleSheet } from "@/helpers/excel/helpers";
import {
  setCommonPayments,
  setConversions,
  setExpenses,
  setGroupedExpenses,
  setHikeInformation,
  setPayments,
} from "@/helpers/excel/sheetDataSetters";
import { setPadding } from "@/helpers/excel/helpers/setPadding";
import { getHikeReportName } from "@/helpers/reports/getHikeReportName";

export const getMainReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Общее", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  let rowIndex = 1;
  createHeaderCell(sheet.getCell(rowIndex, 1), "Общий баланс инструктора");
  rowIndex += 1;
  createHeaderCell(sheet.getCell(rowIndex, 2), "Баланс в валюте");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Баланс в рублях");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Дата курса");
  rowIndex += 1;

  const balanceEntries = [...Object.entries(reportData.balance)];
  for (let [moneyCode, balanceValue] of balanceEntries) {
    sheet.getCell(rowIndex, 2).value = balanceValue.sum + " " + moneyCode;
    sheet.getCell(rowIndex, 3).value = balanceValue.convertedSum;
    sheet.getCell(rowIndex, 4).value = balanceValue.date;
    rowIndex += 1;
  }

  setPadding(sheet);
  setPayments(sheet, reportData.outgoingPayments);
  setPadding(sheet);
  setPayments(sheet, reportData.incomingPayments);

  styleSheet(sheet);

  for (let report of reportData.reports) {
    const sheet = workbook.addWorksheet(getHikeReportName(report), {
      properties: { tabColor: { argb: "FFC0000" } },
    });

    setHikeInformation(sheet, report);
    setPayments(sheet, report.outgoingPayments);
    setPadding(sheet);
    setCommonPayments(sheet, report.moneySums);
    setPadding(sheet);
    setPayments(sheet, report.incomingPayments);
    setPadding(sheet);
    setExpenses(sheet, report.expenses);
    setPadding(sheet);
    setGroupedExpenses(sheet, report.expenses);
    setPadding(sheet);
    setConversions(sheet, report.conversions);
    styleSheet(sheet);
  }

  return workbook.xlsx.writeBuffer();
};
