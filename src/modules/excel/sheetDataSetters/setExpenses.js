import { createHeaderCell } from "@/modules/excel/helpers/createHeaderCell";

export function setExpenses(sheet, expenses) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Рacходы");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Карегория");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Дата");
  createHeaderCell(sheet.getCell(rowIndex, 5), "Комментарий");
  rowIndex += 1;

  for (let expense of expenses) {
    sheet.getCell(rowIndex, 2).value = expense.category;
    sheet.getCell(rowIndex, 3).value = expense.sum;
    sheet.getCell(rowIndex, 4).value = expense.date;
    sheet.getCell(rowIndex, 5).value = expense.comment;

    rowIndex += 1;
  }
}
