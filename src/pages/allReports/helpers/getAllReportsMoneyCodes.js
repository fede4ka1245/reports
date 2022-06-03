export const getAllReportsMoneyCodes = (
  incomingPayments,
  outgoingPayments,
  expenses
) => {
  const moneyCodes = [];

  for (let incomingPayment of incomingPayments) {
    for (let payment of incomingPayment.payments) {
      if (!moneyCodes.includes(payment.moneyCode)) {
        moneyCodes.push(payment.moneyCode);
      }
    }
  }

  for (let incomingPayment of outgoingPayments) {
    for (let payment of incomingPayment.payments) {
      if (!moneyCodes.includes(payment.moneyCode)) {
        moneyCodes.push(payment.moneyCode);
      }
    }
  }

  for (let expense of expenses) {
    if (!moneyCodes.includes(expense.moneyCode)) {
      moneyCodes.push(expense.moneyCode);
    }
  }

  return moneyCodes;
};
