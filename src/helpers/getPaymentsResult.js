export const getPaymentsResult = (payments) => {
  const result = [];

  payments.forEach(({ moneyCode, sum }) => {
    const target = result.find((target) => target.moneyCode === moneyCode);

    if (target) {
      target.sum += Number(sum);
      return;
    }

    result.push({ moneyCode, sum: Number(sum) });
  });

  return result;
};
