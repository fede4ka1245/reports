import { store } from "@/store/store";
import { getAllReportsMoneyCodes } from "@/pages/allReports/helpers/getAllReportsMoneyCodes";
import { convertToRUB } from "@/helpers/conversion";

export const modifyBalance = async () => {
  const balances = [
    ...store.allReports.reports.map((balance) => balance.balance),
    store.currentReport.balance,
  ];

  const moneyCodes = new Set([
    ...getAllReportsMoneyCodes(
      store.allReports.incomingPayments,
      store.allReports.outgoingPayments,
      store.allReports.expenses
    )
  ])

  for (let reportBalance of balances) {
    for (let moneyCodeBalance of reportBalance) {
      moneyCodes.add(moneyCodeBalance.moneyCode);
    }
  }

  let balance = store.allReports.balance;

  for (let moneyCode of Object.keys({ ...balance })) {
    if (![...moneyCodes].includes(moneyCode)) {
      delete store.allReports.balance[moneyCode];
    } else {
      store.allReports.balance[moneyCode].sum = 0;
    }
  }

  for (let reportBalance of balances) {
    for (let moneyCodeBalance of reportBalance) {
      if (!moneyCodeBalance.moneyCode) {
        continue;
      }

      if (balance[moneyCodeBalance.moneyCode]) {
        balance[moneyCodeBalance.moneyCode].sum += Number(
          moneyCodeBalance.finalResult
        );
      } else {
        balance[moneyCodeBalance.moneyCode] = {
          sum: Number(moneyCodeBalance.finalResult),
        };
      }
    }
  }

  for (let incomingPayment of store.allReports.incomingPayments) {
    for (let payment of incomingPayment.payments) {
      if (balance[payment.moneyCode]) {
        balance[payment.moneyCode].sum += Number(payment.sum);
      } else {
        balance[payment.moneyCode] = { sum: Number(payment.sum) };
      }
    }
  }

  for (let incomingPayment of store.allReports.outgoingPayments) {
    for (let payment of incomingPayment.payments) {
      if (balance[payment.moneyCode]) {
        balance[payment.moneyCode].sum -= Number(payment.sum);
      } else {
        balance[payment.moneyCode] = { sum: -Number(payment.sum) };
      }
    }
  }

  for (let expense of store.allReports.expenses) {
    if (balance[expense.moneyCode]) {
      balance[expense.moneyCode].sum -= Number(expense.sum);
    } else {
      balance[expense.moneyCode] = { sum: -Number(expense.sum) };
    }
  }

  for (let [moneyCode, balanceValue] of Array.from(Object.entries(balance))) {
    if (!balanceValue.date || !balanceValue.sum) {
      continue;
    }
    if (moneyCode === "RUB") {
      balanceValue.convertedSum = `${balanceValue.sum}`;
      continue;
    }

    const [day, month, year] = balanceValue.date.split(".");

    balanceValue.convertedSum = await convertToRUB(
      balanceValue.sum,
      moneyCode,
      day,
      month,
      year
    );
  }
};
