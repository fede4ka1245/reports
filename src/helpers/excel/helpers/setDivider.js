export const setDivider = (sheet) => {
  const { rowCount } = sheet;

  for (let columnIndex = 1; columnIndex <= 6; columnIndex++) {
    sheet.getCell(rowCount, columnIndex).border = {
      bottom: { style: "thin", color: { argb: "000000" } },
    };
  }
};
