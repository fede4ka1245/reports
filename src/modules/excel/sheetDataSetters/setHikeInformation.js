import { createHeaderCell } from "@/modules/excel/helpers/createHeaderCell";

export function setHikeInformation(sheet, hikeInformation) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(1, 1), "ID Маршрута");
  sheet.getCell(rowIndex, 2).value = hikeInformation.routeData.id;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(2, 1), "Маршрут");
  sheet.getCell(rowIndex, 2).value = hikeInformation.routeData.name;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(3, 1), "Даты похода");
  sheet.getCell(rowIndex, 2).value = hikeInformation.routeData.date;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(4, 1), "Реальное количество участников");
  sheet.getCell(rowIndex, 2).value = hikeInformation.activeMembers;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(5, 1), "Не явившиеся участники");
  sheet.getCell(rowIndex, 2).value = hikeInformation.inactiveMembers;
  rowIndex += 3;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Итого");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Валюта");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Итого");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Итого на руках");
  rowIndex += 1;

  if (!hikeInformation.result?.length) return;

  for (let i = 0; i < hikeInformation.result?.length; i++) {
    sheet.getCell(rowIndex, 2).value = hikeInformation.result[i].moneyCode;
    sheet.getCell(rowIndex, 3).value = hikeInformation.result[i].result;
    sheet.getCell(rowIndex, 4).value = hikeInformation.result[i].profit;
    rowIndex += 1;
  }
}
