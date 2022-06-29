import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";

export function setPayments(sheet, outgoingPayments) {
  let rowIndex = sheet.rowCount + 1;

  for (let payment of outgoingPayments) {
    const { label, payments } = payment;
    createHeaderCell(sheet.getCell(rowIndex, 1), label);
    rowIndex += 1;

    payment.type !== "office" &&
      createHeaderCell(sheet.getCell(rowIndex, 2), "[id] ФИО");
    createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
    createHeaderCell(sheet.getCell(rowIndex, 4), "Дата");
    createHeaderCell(sheet.getCell(rowIndex, 5), "Комментарий");
    rowIndex += 1;

    for (let i = 0; i < payments?.length; i++) {
      payment.type !== "office" &&
        (sheet.getCell(rowIndex, 2).value =
          `[${payments[i].instructorId}] ${payments[i].name}` || "-");
      sheet.getCell(
        rowIndex,
        3
      ).value = `${payments[i].sum} ${payments[i].moneyCode}`;
      sheet.getCell(rowIndex, 4).value = payments[i].date || "-";
      sheet.getCell(rowIndex, 5).value = payments[i].comment || "-";
      rowIndex += 1;
    }
  }
}
