export function createHeaderCell(cell, value) {
  cell.value = value;
  cell.font = {
    bold: true,
  };
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D9D9D9" },
  };
  cell.border = {
    top: { style: "thin", color: { argb: "C2C3C3" } },
    left: { style: "thin", color: { argb: "C2C3C3" } },
    bottom: { style: "thin", color: { argb: "C2C3C3" } },
    right: { style: "thin", color: { argb: "C2C3C3" } },
  };
}
