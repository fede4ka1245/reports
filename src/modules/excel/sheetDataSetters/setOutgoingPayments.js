import { createHeaderCell } from "@/modules/excel/helpers/createHeaderCell";

export function setOutgoingPayments(sheet, outgoingPayments) {
  let rowIndex = sheet.rowCount + 1;

  for (let payment of outgoingPayments) {
    const { label, payments } = payment;
    createHeaderCell(sheet.getCell(rowIndex, 1), label);
    rowIndex += 1;

    createHeaderCell(sheet.getCell(rowIndex, 2), "[id] ФИО");
    createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
    createHeaderCell(sheet.getCell(rowIndex, 4), "Дата");
    createHeaderCell(sheet.getCell(rowIndex, 5), "Комментарий");
    rowIndex += 1;

    for (let i = 0; i < payments?.length; i++) {
      sheet.getCell(rowIndex, 2).value = payments[i].name || "-";
      sheet.getCell(rowIndex, 3).value = payments[i].sum || 0;
      sheet.getCell(rowIndex, 4).value = payments[i].date || "-";
      sheet.getCell(rowIndex, 5).value = payments[i].comment || "-";
      rowIndex += 1;
    }
  }
}
