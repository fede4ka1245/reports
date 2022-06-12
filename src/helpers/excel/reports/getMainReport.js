import ExcelJS from "exceljs";
import { createHeaderCell, styleSheet } from "@/helpers/excel/helpers";
import {
  setCommonPayments,
  setConversions,
  setExpenses,
  setGroupedExpenses,
  setHikeInformation,
  setIncomingPayments,
  setOutgoingPayments,
} from "@/helpers/excel/sheetDataSetters";
import { groupExpenses } from "@/helpers/groupExpenses";

export const getMainReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("общее", {
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
    sheet.getCell(rowIndex, 2).value = balanceValue.sum;
    sheet.getCell(rowIndex, 3).value =
      balanceValue.convertedSum + " " + moneyCode;
    sheet.getCell(rowIndex, 4).value = balanceValue.date;
    rowIndex += 1;
  }

  setOutgoingPayments(sheet, reportData.outgoingPayments);
  setIncomingPayments(sheet, reportData.incomingPayments);

  styleSheet(sheet);

  for (let report of reportData.reports) {
    const sheet = workbook.addWorksheet(
      report.routeData.id + " " + report.routeData.date,
      {
        properties: { tabColor: { argb: "FFC0000" } },
      }
    );

    setHikeInformation(sheet, report);
    setOutgoingPayments(sheet, report.outgoingPayments);

    setCommonPayments(sheet, report.commonPayments);
    setIncomingPayments(sheet, report.incomingPayments);

    setGroupedExpenses(sheet, groupExpenses(report.expenses));
    setExpenses(sheet, report.expenses);
    setConversions(sheet, report.conversions);

    styleSheet(sheet);
  }

  return workbook.xlsx.writeBuffer();
};
