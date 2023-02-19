import { setColumnsWidth } from "@/helpers/excel/helpers/setColumnsWidth";
import { fillEmptyCells } from "@/helpers/excel/helpers/fillEmptyCells";
import { castWorksheetStringsToNumbers } from "@/helpers/excel/helpers/castWorksheetStringsToNumbers";

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
        wrapText: true
      };

      if (
        columnIndex === columnCount &&
        sheet.getCell(rowIndex, columnIndex).border
      ) {
        sheet.getCell(rowIndex, columnIndex).border.right = {
          style: "thin",
          color: { argb: "000000" },
        };
      }

      if (
        columnIndex === columnCount &&
        !sheet.getCell(rowIndex, columnIndex).border
      ) {
        sheet.getCell(rowIndex, columnIndex).border = {
          right: { style: "thin", color: { argb: "000000" } },
        };
      }

      if (
        rowIndex === rowCount &&
        sheet.getCell(rowIndex, columnIndex).border
      ) {
        sheet.getCell(rowIndex, columnIndex).border.bottom = {
          style: "thin",
          color: { argb: "000000" },
        };
      }

      if (
        rowIndex === rowCount &&
        !sheet.getCell(rowIndex, columnIndex).border
      ) {
        sheet.getCell(rowIndex, columnIndex).border = {
          bottom: { style: "thin", color: { argb: "000000" } },
        };
      }
    }
  }

  castWorksheetStringsToNumbers(sheet);
}
