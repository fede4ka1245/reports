<template>
  <div class="toggle">
    <div>Сгруппировать по категориям</div>
    <q-toggle v-model="data.isGrouped" color="orange" />
  </div>
  <payment-table
    v-if="!data.isGrouped"
    :rows="
      groupedExpenses.map((expense) => ({
        ...expense,
        sum: `${expense.sum} ${expense.moneyCode}`,
      }))
    "
    :columns="expensesColumns"
    :edit="edit"
    :remove="remove"
  />
  <payment-table
    v-if="data.isGrouped"
    :rows="
      groupedExpenses.map((expense) => ({
        ...expense,
        sum: `${expense.sum} ${expense.moneyCode}`,
      }))
    "
    :columns="groupedExpensesColumns"
    :edit="edit"
    :remove="remove"
  />
  <button-add
    :handler="
      () =>
        openModalPage(modalName.modalExpense, {
          saveData: (expense) =>
            (store.currentReport.expenses = [
              ...store.currentReport.expenses,
              expense,
            ]),
          moneyCodes: store.currentReport.moneyCodes,
        })
    "
  />
</template>

<script setup>
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
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
