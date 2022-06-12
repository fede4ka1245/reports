import { store } from "@/store/store";
import { getAllReportsMoneyCodes } from "@/pages/allReports/helpers/getAllReportsMoneyCodes";
import { convertToRUB } from "@/helpers/conversion";

export const modifyBalance = async () => {
  const moneyCodes = getAllReportsMoneyCodes(
    store.allReports.incomingPayments,
    store.allReports.outgoingPayments,
    store.allReports.expenses
  );

  let balance = store.allReports.balance;

  for (let moneyCode of Object.keys(balance)) {
    if (!moneyCodes.includes(moneyCode)) {
      delete store.allReports.balance[moneyCode];
    } else {
      store.allReports.balance[moneyCode].sum = 0;
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
    try {
      if (!balanceValue.date || !balanceValue.sum) {
        continue;
      }
      if (balanceValue.moneyCode === "RUB") {
        balanceValue.convertedSum = `${balanceValue.sum} ${moneyCode}`;
      }

      const [day, month, year] = balanceValue.date.split(".");

      balanceValue.convertedSum = await convertToRUB(
        balanceValue.sum,
        moneyCode,
        day,
        month,
        year
      );
    } catch (error) {
      console.log(error);
      continue;
    }
  }
};
