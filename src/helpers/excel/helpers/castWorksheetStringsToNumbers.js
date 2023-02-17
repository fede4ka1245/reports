import {formatNumber} from "@/helpers/formatNumber";

export const castWorksheetStringsToNumbers = (worksheet) => {
  worksheet.columns.forEach(col => {
    col.eachCell(cell => {
      if (!Number(String(cell.value).replaceAll(" ", ""))) {
        return;
      }

      cell.value = Number(String(cell.value).replaceAll(" ", ""));
      cell.numFmt = formatNumber(Number(String(cell.value).replaceAll(" ", "").replaceAll("-", ""))).replaceAll(/[0-9]/g, "#");
    })
  })
}