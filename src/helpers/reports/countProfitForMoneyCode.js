import { countResultForMoneyCode } from "./countResultForMoneyCode";

export const countProfitForMoneyCode = (currentReport, code) => {
  let profit = Number(countResultForMoneyCode(currentReport, code));

  for (let outgoingPaymentIndex = 1; outgoingPaymentIndex < currentReport.outgoingPayments.length; outgoingPaymentIndex++) {
    for (let payment of currentReport.outgoingPayments[outgoingPaymentIndex].payments) {
      if (payment.moneyCode === code) {
        profit -= Number(payment.sum);
      }
    }
  }

  return profit;
};
