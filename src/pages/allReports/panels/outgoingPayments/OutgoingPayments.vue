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
  <button-add
    :handler="
      () =>
        openModalPage(modalName.modalExpense, {
          saveData: (expense) =>
            (store.allReports.expenses = [
              ...store.allReports.expenses,
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
import Payments from "@/components/paymentsInformation/PaymentsInformation";

import TextHeader from "@/components/textHeader/TextHeader";
import PaymentTable from "@/components/table/PaymentTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { getMoneyCodes } from "@/helpers/getMoneyCodes";

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
</script>
