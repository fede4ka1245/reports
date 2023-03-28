export const resultsColumns = [
  {
    align: "left",
    field: "moneyCode",
    label: "Валюта",
    sortable: true,
  },
  {
    align: "left",
    name: "result",
    field: "result",
    label: "Итог проведения",
    sortable: true,
  },
  {
    align: "left",
    name: "profit",
    field: "resultWithIncomingPayments",
    label: "Итого с учетом получений",
  },
  {
    align: "left",
    name: "profit",
    field: "finalResult",
    label: "Баланс на руках после передач",
  },
];
