import ExcelJS from "exceljs";
import { createHeaderCell, styleSheet } from "@/helpers/excel/helpers";
import {
  setCommonPayments,
  setConversions,
  setExpenses,
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
  sheet.getCell(1, 1).value = `Версия ${process.env.VUE_APP_VERSION}`;
  rowIndex += 1;

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

  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Итого");
  sheet.getCell(rowIndex, 3).value = [
    ...Object.values(reportData.balance),
  ].reduce(
    (previousValue, currentValue) => {
      let convertedSum = currentValue.convertedSum ?? 0;

      return {
        convertedSum: previousValue.convertedSum + Number(convertedSum),
      };
    },
    { convertedSum: 0 }
  ).convertedSum;

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
    // setGroupedExpenses(sheet, groupExpenses(report.expenses));
    setPaymentsResult(sheet, [
      ...groupExpenses(report.expenses).filter(
        ({ isUncountable }) => !isUncountable
      ),
    ]);
    setDivider(sheet);
    setConversions(sheet, report.conversions);
    setDivider(sheet);
    let rowIndex = sheet.rowCount + 1;
    report.checklist.forEach((checkListItem, index) => {
      createHeaderCell(
        sheet.getCell(rowIndex + index, 1),
        checkListItem.header
      );
      sheet.getCell(rowIndex + index, 2).value = checkListItem.result;
      sheet.getCell(rowIndex + index, 3).value = "";
      sheet.getCell(rowIndex + index, 4).value = "";
      sheet.getCell(rowIndex + index, 5).value = "";
      sheet.getCell(rowIndex + index, 6).value = checkListItem.comment;
    });

    styleSheet(sheet);
  }

  return workbook.xlsx.writeBuffer();
};
