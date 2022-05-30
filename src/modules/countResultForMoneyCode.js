export const countResultForMoneyCode = (currentReportStore, code) => {
  let result = Number(currentReportStore.moneySums[code]);

  for (let incomingPayment of currentReportStore.incomingPayments) {
    for (let payment of incomingPayment.payments) {
      if (payment.moneyCode === code) {
        result += Number(payment.sum);
      }
    }
  }

  for (let expense of currentReportStore.expenses) {
    if (expense.moneyCode === code) {
      result -= Number(expense.sum);
    }
  }

  for (let conversion of currentReportStore.conversions) {
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
