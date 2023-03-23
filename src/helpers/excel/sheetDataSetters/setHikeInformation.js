import { createHeaderCell } from "@/helpers/excel/helpers/createHeaderCell";
import { setDivider } from "@/helpers/excel/helpers/setDivider";

export function setHikeInformation(sheet, hikeInformation) {
  let rowIndex = sheet.rowCount + 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "ID Маршрута");
  sheet.getCell(rowIndex, 2).value = hikeInformation.hikeId;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Маршрут");
  sheet.getCell(rowIndex, 2).value = hikeInformation.name;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Даты похода");
  sheet.getCell(rowIndex, 2).value = hikeInformation.dates;
  rowIndex += 1;

  const instructorsPayments = hikeInformation.outgoingPayments.find(
    (payment) => payment.label === "Доходы инструктора"
  );

  const instructorsLabel = [
    ...instructorsPayments.payments.map(({ name, id }) => `[${id.id}] ${name}`),
  ].join(", ");

  createHeaderCell(sheet.getCell(rowIndex, 1), "Инструкторы");
  sheet.getCell(rowIndex, 2).value = instructorsLabel || "-";
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Реальное количество участников");
  sheet.getCell(rowIndex, 2).value = hikeInformation.members;
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 1), "Не явившиеся участники");
  sheet.getCell(rowIndex, 2).value = hikeInformation.inactiveMembers;
  rowIndex += 1;
  setDivider(sheet);

  createHeaderCell(sheet.getCell(rowIndex, 1), "Итого");
  rowIndex += 1;

  createHeaderCell(sheet.getCell(rowIndex, 2), "Итого");
  createHeaderCell(sheet.getCell(rowIndex, 3), "Итого на руках");
  createHeaderCell(sheet.getCell(rowIndex, 4), "Валюта");
  rowIndex += 1;

  if (!hikeInformation.balance?.length) return;

  for (let i = 0; i < hikeInformation.balance?.length; i++) {
    sheet.getCell(rowIndex, 2).value = hikeInformation.balance[i].result || 0;
    sheet.getCell(rowIndex, 3).value = hikeInformation.balance[i].profit || 0;
    sheet.getCell(rowIndex, 4).value = hikeInformation.balance[i].moneyCode;
    rowIndex += 1;
  }
}
