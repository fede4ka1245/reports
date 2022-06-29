<template>
  <payments
    :money-codes="getMoneyCodes()"
    :payments="store.allReports.outgoingPayments"
  />
  <text-header>Общие расходы</text-header>
  <payment-table
    :rows="store.allReports.expenses"
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
import { expensesColumns } from "@/components/table/columns/";
import Payments from "@/components/paymentsInformation/PaymentsInformation";

import TextHeader from "@/components/textHeader/TextHeader";
import PaymentTable from "@/components/table/PaymentTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { getMoneyCodes } from "@/helpers/reports/getMoneyCodes";

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
