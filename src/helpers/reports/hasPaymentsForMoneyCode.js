import { store } from "@/store/store";

export const hasPaymentsForMoneyCode = (code) => {
  const currentReport = store.currentReport;

  if (
    currentReport.moneySums[code] &&
    Number(currentReport.moneySums[code]) !== 0
  ) {
    return true;
  }

  for (let incomingPayment of currentReport.incomingPayments) {
    for (let payment of incomingPayment.payments) {
      if (payment.moneyCode === code) {
        return true;
      }
    }
  }

  for (let incomingPayment of currentReport.incomingPayments) {
    for (let payment of incomingPayment.payments) {
      if (payment.moneyCode === code) {
        return true;
      }
    }
  }

  for (let expense of currentReport.expenses) {
    if (expense.moneyCode === code) {
      return true;
    }
  }

  for (let conversion of currentReport.conversions) {
    if (conversion.to.moneyCode === code || conversion.to.moneyCode === code) {
      return true;
    }
  }

  return false;
};
