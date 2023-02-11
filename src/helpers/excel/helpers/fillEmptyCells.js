export function fillEmptyCells(sheet) {
  const { rowCount, columnCount } = sheet;
  for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
    for (let columnIndex = 1; columnIndex <= columnCount; columnIndex++) {
      if (sheet.getCell(rowIndex, columnIndex).value !== null) {
        continue;
      }

      sheet.getCell(rowIndex, columnIndex).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "d9d9d9" },
      };
    }
  }
}
