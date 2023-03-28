import { countResultForMoneyCodeWithIncomingPayments } from "@/helpers/reports/countResultForMoneyCodeWithIncomingPayments";

export const countFinalResult = (currentReport, code) => {
  let result = Number(
    countResultForMoneyCodeWithIncomingPayments(currentReport, code)
  );

  for (let index = 1; index < currentReport.outgoingPayments.length; index++) {
    for (let payment of currentReport.outgoingPayments[index].payments) {
      if (payment.label === "Доходы инструктора") {
        continue;
      }

      if (payment.moneyCode === code) {
        result += Number(payment.sum);
      }
    }
  }

  return result;
};
