<template>
  <button-download-report />
  <payment-table :columns="resultsColumns" :rows="resultRows" />
  <section
    v-for="(payment, index) in store.currentReportStore.outgoingPayments"
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
            saveData: (_payment) =>
              (payment.payments = [...payment.payments, _payment]),
          })
      "
    />
  </section>
</template>

<script setup>
import { store } from "@/store/store";
import { computed } from "vue";
import { countResultForMoneyCode } from "@/modules/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/modules/countProfitForMoneyCode";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { resultsColumns, paymentsColumns } from "@/components/table/columns/";

import ButtonDownloadReport from "./buttonDownloadReport/ButtonDownloadReport";
import TextHeader from "@/components/textHeader/TextHeader";
import PaymentTable from "@/components/table/PaymentTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";

const remove = (outgoingPaymentIndex) => {
  return (index) => {
    store.currentReportStore.outgoingPayments[
      outgoingPaymentIndex
    ].payments.splice(index, 1);
  };
};

const fix = (outgoingPaymentIndex) => {
  return (index) => {
    openModalPage(modalName.modalPayment, {
      saveData: (payment) => {
        store.currentReportStore.outgoingPayments[
          outgoingPaymentIndex
        ].payments[index] = payment;
      },
      payment:
        store.currentReportStore.outgoingPayments[outgoingPaymentIndex]
          .payments[index],
    });
  };
};

const resultRows = computed(() => {
  return [
    ...store.currentReportStore.moneyCodes.map((code) => {
      return {
        moneyCode: code,
        result: countResultForMoneyCode(store.currentReportStore, code),
        profit: countProfitForMoneyCode(store.currentReportStore, code),
      };
    }),
  ];
});
</script>

<style scoped></style>
