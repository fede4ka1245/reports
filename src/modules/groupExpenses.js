export const groupExpenses = (expenses) => {
  const groupMap = new Map();

  expenses.forEach((expense) => {
    if (groupMap.has(expense.category)) {
      const _expense = groupMap.get(expense.category);
      _expense.count += 1;
      groupMap.set(expense.category, _expense);
    } else {
      groupMap.set(expense.category, { ...expense, count: 1 });
    }
  });

  return Array.from(groupMap.values());
};
