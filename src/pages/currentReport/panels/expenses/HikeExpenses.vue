<template>
  <div class="toggle">
    <div>Сгруппировать по категориям</div>
    <q-toggle v-model="data.isGrouped" color="orange" />
  </div>
  <payment-table
      v-if="!data.isGrouped"
      :rows="expensesRows"
      :columns="expensesColumns"
      :edit="edit"
      :remove="remove"
  />
  <payment-table
      v-if="data.isGrouped"
      :rows="groupedExpensesRows"
      :columns="groupedExpensesColumns"
      :edit="edit"
      :remove="remove"
  />
  <button-add :handler="onExpenseAdd" />
</template>

<script setup>
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { modalName } from "@/modalPages/helpers/modalName";
import { store } from "@/store/store";
import { expensesColumns } from "@/components/table/columns";
import PaymentTable from "@/components/table/PaymentTable";
import { reactive, computed } from "vue";
import { groupedExpensesColumns } from "@/components/table/columns";
import { groupExpenses } from "@/helpers/groupExpenses";

const groupedExpenses = computed(() => {
  return groupExpenses(store.currentReport.expenses);
});

const data = reactive({
  isGrouped: false,
});

const remove = (index) => {
  store.currentReport.expenses.splice(index, 1);
};

const groupedExpensesRows = computed(() => {
  return groupedExpenses.value?.map((expense) => {
    if (expense.isUncountable) {
      return {
        ...expense,
        sum: "-"
      }
    }

    return {
      ...expense,
      sum: `${expense.sum} ${expense.moneyCode}`,
    }
  });
});
const expensesRows = computed(() => {
  return store.currentReport?.expenses.map((expense) => ({
    ...expense,
    sum: `${expense.sum} ${expense.moneyCode}`,
  }));
});

const onExpenseAdd = () => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) =>
        (store.currentReport.expenses = [
          ...store.currentReport.expenses,
          expense,
        ]),
    moneyCodes: store.currentReport.moneyCodes,
  });
};

const edit = (index) => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) => (store.currentReport.expenses[index] = expense),
    expense: store.currentReport.expenses[index],
    moneyCodes: store.currentReport.moneyCodes,
  });
};
</script>

<style scoped>
.toggle {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
