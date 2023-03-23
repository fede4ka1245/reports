export const groupExpenses = (expenses) => {
  const grouped = [];

  expenses.forEach((expense) => {
    const targetExpenseIndex = grouped.findIndex(({ category, moneyCode }) => {
      return category === expense.category && moneyCode === expense.moneyCode;
    });

    if (targetExpenseIndex !== -1) {
      grouped[targetExpenseIndex].count += 1;
      grouped[targetExpenseIndex].sum =
        Number(grouped[targetExpenseIndex].sum) + Number(expense.sum);
      return;
    }

    grouped.push({ ...expense, count: 1 });
  });

  return grouped;
};
