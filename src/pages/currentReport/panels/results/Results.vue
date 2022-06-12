<template>
  <button-download-report />
  <payment-table
    :columns="resultsColumns"
    :rows="store.currentReport.balance"
  />
  <payments
    :payments="store.currentReport.outgoingPayments"
    :money-codes="store.currentReport.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { onMounted, watch } from "vue";
import { countResultForMoneyCode } from "@/helpers/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/helpers/countProfitForMoneyCode";
import { resultsColumns } from "@/components/table/columns/";
import Payments from "@/components/payments/Payments";

import ButtonDownloadReport from "./buttonDownloadReport/ButtonDownloadReport";
import PaymentTable from "@/components/table/PaymentTable";

const getReportResults = () => {
  return [
    ...store.currentReport.moneyCodes.map((code) => {
      return {
        moneyCode: code,
        result: countResultForMoneyCode(store.currentReport, code),
        profit: countProfitForMoneyCode(store.currentReport, code),
      };
    }),
  ];
};

onMounted(() => {
  store.currentReport.balance = getReportResults();
});

watch(store.currentReport.outgoingPayments, () => {
  store.currentReport.balance = getReportResults();
});
</script>

<style scoped></style>
