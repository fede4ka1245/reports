import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";
import { groupExpenses } from "@/helpers/reports/groupExpenses";

export function setGroupedExpenses(sheet, expenses) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Расходы по категориям");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Категория");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Валюта");
  rowIndex += 1;

  for (let expense of groupExpenses(expenses)) {
    sheet.getCell(rowIndex, 2).value = expense.category;
    sheet.getCell(rowIndex, 3).value = expense.isUncountable
      ? "-"
      : expense.sum;
    sheet.getCell(rowIndex, 4).value = expense.isUncountable
      ? "-"
      : expense.moneyCode;

    rowIndex += 1;
  }
}
