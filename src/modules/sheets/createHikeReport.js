import ExcelJS from "exceljs";

export const createHikeReport = (reportData) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("отчёт", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  createHeaderCell(sheet.getCell(1, 1), "ID Маршрута");
  sheet.getCell(1, 2).value = reportData.hikeId;

  createHeaderCell(sheet.getCell(2, 1), "Маршрут");
  sheet.getCell(2, 2).value = reportData.hikeName;

  createHeaderCell(sheet.getCell(3, 1), "Даты похода");
  sheet.getCell(3, 2).value = reportData.hikeDates;

  createHeaderCell(sheet.getCell(4, 1), "Реальное количество участников");
  sheet.getCell(4, 2).value = reportData.activeMembers;

  createHeaderCell(sheet.getCell(5, 1), "Не явившиеся участники");
  sheet.getCell(5, 2).value = reportData.inactiveMembers;

  createHeaderCell(sheet.getCell(8, 1), "Итого");
  createHeaderCell(sheet.getCell(9, 2), "Валюта");
  createHeaderCell(sheet.getCell(9, 3), "Итого");
  createHeaderCell(sheet.getCell(9, 4), "Итого на руках");
  for (let i = 0; i < reportData.result.length; i++) {
    sheet.getCell(10 + i, 2).value = reportData.result[i].moneyCode;
    sheet.getCell(10 + i, 3).value = reportData.result[i].result;
    sheet.getCell(10 + i, 4).value = reportData.result[i].profit;
  }

  let rowIndex = 13 + reportData.result.length;

  for (let payment of reportData.outgoingPayments) {
    const { name, payments } = payment;
    createHeaderCell(sheet.getCell(rowIndex, 1), name);
    rowIndex += 1;

    createHeaderCell(sheet.getCell(rowIndex, 2), "[id] ФИО");
    createHeaderCell(sheet.getCell(rowIndex, 3), "Сумма");
    createHeaderCell(sheet.getCell(rowIndex, 4), "Дата");
    createHeaderCell(sheet.getCell(rowIndex, 5), "Комментарий");
    rowIndex += 1;

    for (let i = 0; i < payments?.length; i++) {
      sheet.getCell(rowIndex, 2).value = payments[i].name || "-";
      sheet.getCell(rowIndex, 3).value = payments[i].sum || 0;
      sheet.getCell(rowIndex, 4).value = payments[i].date || "-";
      sheet.getCell(rowIndex, 5).value = payments[i].comment || "-";
      rowIndex += 1;
    }
  }

  fillEmptyCells(sheet);
  setColumnWidth(sheet, 35);

  const incomingPaymentsSheet = workbook.addWorksheet("Сборы", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  rowIndex = 1;

  createHeaderCell(
    incomingPaymentsSheet.getCell(rowIndex, 1),
    "Общаяя сумма оплат участников"
  );

  rowIndex += 1;
  createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 2), "Сумма");
  createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 3), "Валюта");

  rowIndex += 1;

  for (let [moneyCode, sum] of [...Object.entries(reportData.commonPayments)]) {
    incomingPaymentsSheet.getCell(rowIndex, 2).value = sum;
    incomingPaymentsSheet.getCell(rowIndex, 3).value = moneyCode;

    rowIndex += 1;
  }

  rowIndex += 2;

  for (let payment of reportData.incomingPayments) {
    const { name, payments } = payment;
    console.log(payment);
    createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 1), name);
    rowIndex += 1;

    createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 2), "[id] ФИО");
    createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 3), "Сумма");
    createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 4), "Дата");
    createHeaderCell(incomingPaymentsSheet.getCell(rowIndex, 5), "Комментарий");
    rowIndex += 1;

    for (let i = 0; i < payments?.length; i++) {
      incomingPaymentsSheet.getCell(rowIndex, 2).value =
        payments[i].name || "-";
      incomingPaymentsSheet.getCell(rowIndex, 3).value = payments[i].sum || 0;
      incomingPaymentsSheet.getCell(rowIndex, 4).value =
        payments[i].date || "-";
      incomingPaymentsSheet.getCell(rowIndex, 5).value =
        payments[i].comment || "-";

      rowIndex += 1;
    }
  }

  fillEmptyCells(incomingPaymentsSheet);
  setColumnWidth(incomingPaymentsSheet, 35);

  const expensesSheet = workbook.addWorksheet("Расходы", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  rowIndex = 1;

  createHeaderCell(expensesSheet.getCell(1, 1), "Рacходы");
  rowIndex += 1;

  createHeaderCell(expensesSheet.getCell(rowIndex, 2), "Карегория");
  createHeaderCell(expensesSheet.getCell(rowIndex, 3), "Сумма");
  createHeaderCell(expensesSheet.getCell(rowIndex, 4), "Дата");
  createHeaderCell(expensesSheet.getCell(rowIndex, 5), "Комментарий");
  rowIndex += 1;

  for (let expense of reportData.expenses) {
    expensesSheet.getCell(rowIndex, 2).value = expense.category;
    expensesSheet.getCell(rowIndex, 3).value = expense.sum;
    expensesSheet.getCell(rowIndex, 4).value = expense.date;
    expensesSheet.getCell(rowIndex, 5).value = expense.comment;

    rowIndex += 1;
  }

  createHeaderCell(expensesSheet.getCell(rowIndex, 1), "Конвертация");
  rowIndex += 1;

  createHeaderCell(expensesSheet.getCell(rowIndex, 2), "Из");
  createHeaderCell(expensesSheet.getCell(rowIndex, 3), "В");
  createHeaderCell(expensesSheet.getCell(rowIndex, 4), "Дата");
  createHeaderCell(expensesSheet.getCell(rowIndex, 5), "Комментарий");
  rowIndex += 1;

  for (let conversion of reportData.conversions) {
    expensesSheet.getCell(
      rowIndex,
      2
    ).value = `${conversion.from.sum} ${conversion.from.moneyCode}`;
    expensesSheet.getCell(
      rowIndex,
      3
    ).value = `${conversion.to.sum} ${conversion.to.moneyCode}`;
    expensesSheet.getCell(rowIndex, 4).value = conversion.date;
    expensesSheet.getCell(rowIndex, 5).value = conversion.comment;

    rowIndex += 1;
  }

  fillEmptyCells(expensesSheet);
  setColumnWidth(expensesSheet, 35);

  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "report.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};

function createHeaderCell(cell, value) {
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

function fillEmptyCells(sheet) {
  const { rowCount, columnCount } = sheet;
  for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
    for (let columnIndex = 1; columnIndex <= columnCount; columnIndex++) {
      if (sheet.getCell(rowIndex, columnIndex).value !== null) {
        continue;
      }

      sheet.getCell(rowIndex, columnIndex).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "999999" },
      };
    }
  }
}

function setColumnWidth(sheet, width) {
  sheet.columns.forEach((column) => {
    column.width = width;
  });
}
