import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";
import {groupExpenses} from "@/helpers/groupExpenses";

export function setGroupedExpenses(sheet, expenses) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Расходы по категориям");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Карегория");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
  rowIndex += 1;

  for (let expense of groupExpenses(expenses)) {
    sheet.getCell(rowIndex, 2).value = expense.category;
    sheet.getCell(rowIndex, 3).value = expense.isUncountable ? "-" : `${expense.sum} ${expense.moneyCode}`;

    rowIndex += 1;
  }
}
