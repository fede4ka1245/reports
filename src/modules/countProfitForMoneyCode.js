import { countResultForMoneyCode } from "./countResultForMoneyCode";

export const countProfitForMoneyCode = (currentReportStore, code) => {
  let profit = Number(countResultForMoneyCode(currentReportStore, code));

  for (let outgoingPayment of currentReportStore.outgoingPayments) {
    for (let payment of outgoingPayment.payments) {
      if (payment.moneyCode === code) {
        profit -= Number(payment.sum);
      }
    }
  }

  return profit;
};
