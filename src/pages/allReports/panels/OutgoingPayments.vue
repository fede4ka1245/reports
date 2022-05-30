<template>
  <section
    v-for="(payment, index) in store.allReportsStore.outgoingPayments"
    :key="payment.label"
  >
    <text-header>{{ payment.label }}</text-header>
    <payment-table
      :columns="paymentsColumns"
      :rows="payment.payments"
      :edit="fix(index)"
      :remove="remove(index)"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.modalPayment, {
            type: payment.type,
            saveData: (_payment) =>
              (payment.payments = [...payment.payments, _payment]),
          })
      "
    />
  </section>
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
        })
    "
  />
</template>

<script setup>
import { store } from "@/store/store";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { expensesColumns, paymentsColumns } from "@/components/table/columns/";

import TextHeader from "@/components/textHeader/TextHeader";
import PaymentTable from "@/components/table/PaymentTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";

const remove = (outgoingPaymentIndex) => {
  return (index) => {
    store.allReportsStore.outgoingPayments[
      outgoingPaymentIndex
    ].payments.splice(index, 1);
  };
};

const fix = (outgoingPaymentIndex) => {
  return (index) => {
    openModalPage(modalName.modalPayment, {
      saveData: (payment) => {
        store.allReportsStore.outgoingPayments[outgoingPaymentIndex].payments[
          index
        ] = payment;
      },
      payment:
        store.allReportsStore.outgoingPayments[outgoingPaymentIndex].payments[
          index
        ],
    });
  };
};

const editExpense = (index) => {
  openModalPage(modalName.modalExpense, {
    saveData: (expense) => {
      store.allReportsStore.expenses[index] = expense;
    },
    expense: store.allReportsStore.expenses[index],
  });
};

const removeExpense = (index) => {
  store.allReportsStore.expenses.splice(index, 1);
};
</script>
