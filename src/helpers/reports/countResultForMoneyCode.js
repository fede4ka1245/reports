export const countResultForMoneyCode = (currentReport, code) => {
  let result = currentReport.moneySums[code]
    ? Number(currentReport.moneySums[code])
    : 0;

  const instructorsRevenues = currentReport.outgoingPayments[0].payments;

  for (let payment of instructorsRevenues) {
    if (payment.moneyCode === code) {
      result -= Number(payment.sum);
    }
  }

  for (let incomingPayment of currentReport.incomingPayments) {
    if (incomingPayment.type === "members") {
      continue;
    }

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

  // for (let conversion of currentReport.conversions) {
  //   if (
  //     conversion.from.moneyCode !== code &&
  //     conversion.to.moneyCode === code
  //   ) {
  //     result += Number(conversion.to.sum);
  //   } else if (
  //     conversion.from.moneyCode === code &&
  //     conversion.to.moneyCode !== code
  //   ) {
  //     result -= Number(conversion.to.sum);
  //   }
  // }

  return result;
};
