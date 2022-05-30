<template>
  <div class="toggle">
    <div>Сгруппировать по категориям</div>
    <q-toggle v-model="data.isGrouped" color="orange" />
  </div>
  <payment-table
    v-if="!data.isGrouped"
    :rows="store.currentReportStore.expenses"
    :columns="expensesColumns"
    :edit="edit"
    :remove="remove"
  />
  <payment-table
    v-if="data.isGrouped"
    :rows="groupedExpenses"
    :columns="groupedExpensesColumns"
    :edit="edit"
    :remove="remove"
  />
  <button-add
    :handler="
      () =>
        openModalPage(modalName.modalExpense, {
          saveData: (expense) =>
            (store.currentReportStore.expenses = [
              ...store.currentReportStore.expenses,
              expense,
            ]),
          moneyCodes: store.currentReportStore.moneyCodes,
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
import { groupExpenses } from "@/modules/groupExpenses";

const groupedExpenses = computed(() => {
  return groupExpenses(store.currentReportStore.expenses);
});

const data = reactive({
  isGrouped: false,
});

const remove = (index) => {
  store.currentReportStore.expenses.splice(index, 1);
};

const edit = (index) => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) => (store.currentReportStore.expenses[index] = expense),
    expense: store.currentReportStore.expenses[index],
    moneyCodes: store.currentReportStore.moneyCodes,
  });
};
</script>

<style scoped>
.toggle {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
