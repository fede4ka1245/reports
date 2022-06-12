import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";

export function setGroupedExpenses(sheet, expenses) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Расходы по категориям");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Карегория");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
  rowIndex += 1;

  for (let expense of expenses) {
    sheet.getCell(rowIndex, 2).value = expense.category;
    sheet.getCell(rowIndex, 3).value = expense.sum * expense.count;

    rowIndex += 1;
  }
}
