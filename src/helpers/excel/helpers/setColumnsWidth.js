export function setColumnsWidth(sheet, width) {
  sheet.columns.forEach((column) => {
    column.width = width;
  });
}
