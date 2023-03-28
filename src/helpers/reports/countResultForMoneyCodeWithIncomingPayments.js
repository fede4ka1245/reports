import { countResultForMoneyCode } from "./countResultForMoneyCode";

export const countResultForMoneyCodeWithIncomingPayments = (
  currentReport,
  code
) => {
  let profit = Number(countResultForMoneyCode(currentReport, code));

  for (let index = 1; index < currentReport.incomingPayments.length; index++) {
    for (let payment of currentReport.incomingPayments[index].payments) {
      if (payment.moneyCode === code) {
        profit += Number(payment.sum);
      }
    }
  }

  return profit;
};
