<template>
  <payments-information
    :money-codes="getMoneyCodes()"
    :payments="store.allReports.outgoingPayments"
  />
  <text-header :description="unitsDescriptions.generalExpenses.description">
    Общие расходы
  </text-header>
  <expense-table
    :rows="displayedExpenses"
    :columns="expensesColumns"
    :edit="editExpense"
    :remove="removeExpense"
  />
  <button-add :handler="onPaymentAdd" />
</template>

<script setup>
import { store } from "@/store/store";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { modalName } from "@/modalPages/helpers/modalName";
import { expensesColumns } from "@/components/expenseTable/columns/expensesColumns";
import PaymentsInformation from "@/components/paymentsInformation/PaymentsInformation";
import TextHeader from "@/components/textHeader/TextHeader";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { getMoneyCodes } from "@/helpers/reports/getMoneyCodes";
import ExpenseTable from "@/components/expenseTable/ExpenseTable";
import { unitsDescriptions } from "@/helpers/unitsDescriptions";
import {computed} from "vue";

const displayedExpenses = computed(() => {
  return [...store.allReports.expenses.map((expense) => ({
    ...expense,
    sum: `${expense.sum} ${expense.moneyCode}`
  }))]
});

const editExpense = (index) => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) => {
      store.allReports.expenses[index] = expense;
    },
    expense: store.allReports.expenses[index],
    moneyCodes: getMoneyCodes(),
  });
};

const removeExpense = (index) => {
  store.allReports.expenses.splice(index, 1);
};

const onPaymentAdd = () => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) =>
      (store.allReports.expenses = [...store.allReports.expenses, expense]),
    moneyCodes: getMoneyCodes(),
  });
};
</script>
