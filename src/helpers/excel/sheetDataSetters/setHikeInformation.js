import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";

export function setHikeInformation(sheet, hikeInformation) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(1, 1), "ID Маршрута");
  console.log(hikeInformation.hikeId)
  sheet.getCell(rowIndex, 2).value = hikeInformation.hikeId;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(2, 1), "Маршрут");
  sheet.getCell(rowIndex, 2).value = hikeInformation.name;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(3, 1), "Даты похода");
  sheet.getCell(rowIndex, 2).value = hikeInformation.dates;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(4, 1), "Реальное количество участников");
  sheet.getCell(rowIndex, 2).value = hikeInformation.members;
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

  if (!hikeInformation.balance?.length) return;

  for (let i = 0; i < hikeInformation.balance?.length; i++) {
    sheet.getCell(rowIndex, 2).value = hikeInformation.balance[i].moneyCode;
    sheet.getCell(rowIndex, 3).value = hikeInformation.balance[i].result;
    sheet.getCell(rowIndex, 4).value = hikeInformation.balance[i].profit;
    rowIndex += 1;
  }
}
