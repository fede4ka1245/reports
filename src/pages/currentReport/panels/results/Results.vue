<template>
  <button-download-report />
  <payment-table :columns="resultsColumns" :rows="resultTableRows" />
  <payments
    :payments="store.currentReportStore.outgoingPayments"
    :money-codes="store.currentReportStore.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { computed } from "vue";
import { countResultForMoneyCode } from "@/modules/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/modules/countProfitForMoneyCode";
import { resultsColumns } from "@/components/table/columns/";
import Payments from "@/components/payments/Payments";

import ButtonDownloadReport from "./buttonDownloadReport/ButtonDownloadReport";
import PaymentTable from "@/components/table/PaymentTable";

const resultTableRows = computed(() => {
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
