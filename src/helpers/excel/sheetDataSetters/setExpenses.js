import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";

export function setExpenses(sheet, expenses) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Расходы");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Категория");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Дата");
  createHeaderCell(sheet.getCell(rowIndex, 5), "Комментарий");
  rowIndex += 1;

  for (let expense of expenses) {
    sheet.getCell(rowIndex, 2).value = expense.category;
    sheet.getCell(rowIndex, 3).value = `${expense.sum} ${expense.moneyCode}`;
    sheet.getCell(rowIndex, 4).value = expense.date;
    sheet.getCell(rowIndex, 5).value = expense.comment;

    rowIndex += 1;
  }
}
