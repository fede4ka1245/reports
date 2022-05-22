import { countResultForMoneyCode } from "./countResultForMoneyCode";

export const countProfitForMoneyCode = (currentReportStore, code) => {
  let profit = Number(countResultForMoneyCode(currentReportStore, code));

  for (let payment of currentReportStore.paymentsToInstructors) {
    if (payment.moneyCode === code) {
      profit -= Number(payment.sum);
    }
  }

  for (let payment of currentReportStore.paymentsToTutors) {
    if (payment.moneyCode === code) {
      profit -= Number(payment.sum);
    }
  }

  for (let payment of currentReportStore.paymentsToOffice) {
    if (payment.moneyCode === code) {
      profit -= Number(payment.sum);
    }
  }

  for (let payment of currentReportStore.instructorsRevenue) {
    if (payment.moneyCode === code) {
      profit -= Number(payment.sum);
    }
  }

  return profit;
};
