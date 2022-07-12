import { setColumnsWidth } from "@/helpers/excel/helpers/setColumnsWidth";
import { fillEmptyCells } from "@/helpers/excel/helpers/fillEmptyCells";

export function styleSheet(sheet) {
  setColumnsWidth(sheet, 36);
  fillEmptyCells(sheet);

  const { rowCount, columnCount } = sheet;

  for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
    for (let columnIndex = 1; columnIndex <= columnCount; columnIndex++) {
      sheet.getCell(rowIndex, columnIndex).font = {
        ...sheet.getCell(rowIndex, columnIndex).font,
        name: "Arial",
        size: 10,
      };

      sheet.getCell(rowIndex, columnIndex).alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    }
  }
}
