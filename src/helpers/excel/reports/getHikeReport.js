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
import { setDivider } from "@/helpers/excel/helpers/setDivider";
import { setPaymentsResult } from "@/helpers/excel/sheetDataSetters/setPaymentsResult";

export const getHikeReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Общее");

  setHikeInformation(sheet, reportData);
  setDivider(sheet);
  setPayments(
    sheet,
    reportData.outgoingPayments.filter(
      (payment) => payment.label !== "Доходы инструктора"
    )
  );
  styleSheet(sheet);

  const incomingPaymentsSheet = workbook.addWorksheet("Доходы");

  setCommonPayments(incomingPaymentsSheet, reportData.moneySums);
  setDivider(incomingPaymentsSheet);
  setPayments(incomingPaymentsSheet, reportData.incomingPayments);
  styleSheet(incomingPaymentsSheet);

  const expensesSheet = workbook.addWorksheet("Расходы");

  setExpenses(expensesSheet, reportData.expenses);
  setPaymentsResult(expensesSheet, reportData.expenses);
  setDivider(expensesSheet);
  setPayments(
    expensesSheet,
    reportData.outgoingPayments.filter(
      (payment) => payment.label === "Доходы инструктора"
    )
  );
  setPaymentsResult(
    expensesSheet,
    reportData.outgoingPayments.find(
      (payment) => payment.label === "Доходы инструктора"
    ).payments
  );
  setDivider(expensesSheet);
  setGroupedExpenses(expensesSheet, groupExpenses(reportData.expenses));
  setPaymentsResult(expensesSheet, [
    ...groupExpenses(reportData.expenses).filter(
      ({ isUncountable }) => !isUncountable
    ),
  ]);
  setDivider(expensesSheet);
  setConversions(expensesSheet, reportData.conversions);

  styleSheet(expensesSheet);

  return workbook.xlsx.writeBuffer();
};
