<template>
  <payments
    :money-codes="getMoneyCodes()"
    :payments="store.allReportsStore.outgoingPayments"
  />
  <text-header>Общие расходы</text-header>
  <payment-table
    :rows="store.allReportsStore.expenses"
    :columns="expensesColumns"
    :edit="editExpense"
    :remove="removeExpense"
  />
  <button-add
    :handler="
      () =>
        openModalPage(modalName.modalExpense, {
          saveData: (expense) =>
            (store.allReportsStore.expenses = [
              ...store.allReportsStore.expenses,
              expense,
            ]),
          moneyCodes: getMoneyCodes(),
        })
    "
  />
</template>

<script setup>
import { store } from "@/store/store";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { expensesColumns } from "@/components/table/columns/";
import Payments from "@/components/payments/Payments";

import TextHeader from "@/components/textHeader/TextHeader";
import PaymentTable from "@/components/table/PaymentTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { getMoneyCodes } from "@/modules/getMoneyCodes";

const editExpense = (index) => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) => {
      store.allReportsStore.expenses[index] = expense;
    },
    expense: store.allReportsStore.expenses[index],
    moneyCodes: getMoneyCodes(),
  });
};

const removeExpense = (index) => {
  store.allReportsStore.expenses.splice(index, 1);
};
</script>
