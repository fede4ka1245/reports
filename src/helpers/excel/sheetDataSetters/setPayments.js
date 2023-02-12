import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";
import {setDivider} from "@/helpers/excel/helpers/setDivider";

export function setPayments(sheet, outgoingPayments) {
  setDivider(sheet);
  let rowIndex = sheet.rowCount + 1;

  for (let payment of outgoingPayments) {
    const { label, payments } = payment;

    createHeaderCell(sheet.getCell(rowIndex, 1), label);
    rowIndex += 1;

    if (payment.type !== "office" && payment.type !== "members") {
      createHeaderCell(sheet.getCell(rowIndex, 2), "[id] ФИО");
    }

    if (payment.type === "members") {
      createHeaderCell(sheet.getCell(rowIndex, 2), "участник");
    }

    createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
    createHeaderCell(sheet.getCell(rowIndex, 4), "Валюта");
    createHeaderCell(sheet.getCell(rowIndex, 5), "Дата");
    createHeaderCell(sheet.getCell(rowIndex, 6), "Комментарий");
    rowIndex += 1;

    for (let i = 0; i < payments?.length; i++) {
      if (payment.type !== "office" && payment.type !== "members") {
        sheet.getCell(rowIndex, 2).value =
          `[${payments[i].instructorId}] ${payments[i].name}` || "-";
      }

      if (payment.type === "members") {
        sheet.getCell(rowIndex, 2).value = payments[i].name;
      }

      sheet.getCell(rowIndex, 3).value = payments[i].sum;
      sheet.getCell(rowIndex, 4).value = payments[i].moneyCode;
      sheet.getCell(rowIndex, 5).value = payments[i].date || "-";
      sheet.getCell(rowIndex, 6).value = payments[i].comment || "-";
      rowIndex += 1;
    }

    setDivider(sheet);
  }
}
