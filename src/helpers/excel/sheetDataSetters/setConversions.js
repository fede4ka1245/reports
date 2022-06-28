import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";

export function setConversions(sheet, conversions) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Конвертация");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Из");
  createHeaderCell(sheet.getCell(rowIndex, 3), "В");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Дата");
  createHeaderCell(sheet.getCell(rowIndex, 5), "Комментарий");
  rowIndex += 1;

  for (let conversion of conversions) {
    sheet.getCell(
      rowIndex,
      2
    ).value = `${conversion.from.sum} ${conversion.from.moneyCode}`;
    sheet.getCell(
      rowIndex,
      3
    ).value = `${conversion.to.sum} ${conversion.to.moneyCode}`;
    sheet.getCell(rowIndex, 4).value = conversion.date;
    sheet.getCell(rowIndex, 5).value = conversion.comment;

    rowIndex += 1;
  }
}
