import { getPaymentsResult } from "@/helpers/getPaymentsResult";
import { createHeaderCell } from "@/helpers/excel/helpers";

export const setPaymentsResult = (sheet, payments) => {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Итого");
  rowIndex += 1;

  const paymentsResults = getPaymentsResult(payments);

  for (const { moneyCode, sum } of paymentsResults) {
    sheet.getCell(rowIndex, 3).value = sum;
    sheet.getCell(rowIndex, 4).value = moneyCode;

    rowIndex += 1;
  }
};
