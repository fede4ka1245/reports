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
import { setDivider } from "@/helpers/excel/helpers/setDivider";
import { getHikeReportName } from "@/helpers/reports/getHikeReportName";
import { setPaymentsResult } from "@/helpers/excel/sheetDataSetters/setPaymentsResult";
import { groupExpenses } from "@/helpers/reports/groupExpenses";

export const getMainReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Общее");

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

  setDivider(sheet);
  setPayments(sheet, reportData.outgoingPayments);
  setDivider(sheet);
  setPayments(sheet, reportData.incomingPayments);

  styleSheet(sheet);

  for (let report of reportData.reports) {
    const sheet = workbook.addWorksheet(getHikeReportName(report));

    setHikeInformation(sheet, report);
    setPayments(
      sheet,
      report.outgoingPayments.filter(
        (payment) => payment.label !== "Доходы инструктора"
      )
    );
    setDivider(sheet);
    setCommonPayments(sheet, report.moneySums);
    setDivider(sheet);
    setPayments(sheet, report.incomingPayments);
    setDivider(sheet);
    setExpenses(sheet, report.expenses);
    setPaymentsResult(sheet, report.expenses);
    setDivider(sheet);
    setPayments(
      sheet,
      report.outgoingPayments.filter(
        (payment) => payment.label === "Доходы инструктора"
      )
    );
    setPaymentsResult(
      sheet,
      report.outgoingPayments.find(
        (payment) => payment.label === "Доходы инструктора"
      ).payments
    );
    setDivider(sheet);
    setGroupedExpenses(sheet, groupExpenses(report.expenses));
    setPaymentsResult(sheet, [
      ...groupExpenses(report.expenses).filter(
        ({ isUncountable }) => !isUncountable
      ),
    ]);
    setDivider(sheet);
    setConversions(sheet, report.conversions);

    styleSheet(sheet);
  }

  return workbook.xlsx.writeBuffer();
};
