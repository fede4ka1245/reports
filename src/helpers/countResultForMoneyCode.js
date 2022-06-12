export const countResultForMoneyCode = (currentReport, code) => {
  let result = Number(currentReport.moneySums[code]);

  for (let incomingPayment of currentReport.incomingPayments) {
    for (let payment of incomingPayment.payments) {
      if (payment.moneyCode === code) {
        result += Number(payment.sum);
      }
    }
  }

  for (let expense of currentReport.expenses) {
    if (expense.moneyCode === code) {
      result -= Number(expense.sum);
    }
  }

  for (let conversion of currentReport.conversions) {
    if (
      conversion.from.moneyCode !== code &&
      conversion.to.moneyCode === code
    ) {
      result += Number(conversion.to.sum);
    } else if (
      conversion.from.moneyCode === code &&
      conversion.to.moneyCode !== code
    ) {
      result -= Number(conversion.to.sum);
    }
  }

  return result;
};
