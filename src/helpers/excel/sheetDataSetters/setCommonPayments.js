import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";

export function setCommonPayments(sheet, commonPayments) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Общая сумма оплат участников");

  rowIndex += 1;
  createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Валюта");

  rowIndex += 1;

  for (let [moneyCode, sum] of [...Object.entries(commonPayments)]) {
    sheet.getCell(rowIndex, 3).value = sum;
    sheet.getCell(rowIndex, 4).value = moneyCode;

    rowIndex += 1;
  }
}
