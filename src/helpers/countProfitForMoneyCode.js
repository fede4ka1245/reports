import { countResultForMoneyCode } from "./countResultForMoneyCode";

export const countProfitForMoneyCode = (currentReport, code) => {
  let profit = Number(countResultForMoneyCode(currentReport, code));

  for (let outgoingPayment of currentReport.outgoingPayments) {
    for (let payment of outgoingPayment.payments) {
      if (payment.moneyCode === code) {
        profit -= Number(payment.sum);
      }
    }
  }

  return profit;
};
