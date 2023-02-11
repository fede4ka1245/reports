export function createHeaderCell(cell, value) {
  cell.value = value;
  cell.font = {
    bold: true,
  };
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "b7b7b7" },
  };
  cell.border = {
    top: { style: "thin", color: { argb: "a5a5a6" } },
    left: { style: "thin", color: { argb: "a5a5a6" } },
    bottom: { style: "thin", color: { argb: "a5a5a6" } },
    right: { style: "thin", color: { argb: "a5a5a6" } },
  };
}
