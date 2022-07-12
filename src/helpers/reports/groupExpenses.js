export const groupExpenses = (expenses) => {
  const groupMap = new Map();

  expenses.forEach((expense) => {
    if (groupMap.has(expense.category)) {
      const _expense = groupMap.get(expense.category);
      _expense.count += 1;

      if (expense.moneyCode === _expense.moneyCode && !_expense.isUncountable) {
        _expense.sum = Number(expense.sum) + Number(_expense.sum);
      } else {
        _expense.isUncountable = true;
      }

      groupMap.set(expense.category, _expense);
    } else {
      groupMap.set(expense.category, { ...expense, count: 1 });
    }
  });

  return Array.from(groupMap.values());
};
