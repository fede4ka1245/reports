<template>
  <button-download-report />
  <payment-table
    :columns="resultsColumns"
    :rows="store.currentReport.balance"
  />
  <app-informer>
    <p>
      <strong>Итого =</strong> вкладка сборы - вкладка расходы - доходы инструктора
    </p>
    <p>
      <strong>Итого на руках = Итого</strong> - передачи инструкторам/кураторам/офису
    </p>
  </app-informer>
  <payments
    :payments="store.currentReport.outgoingPayments"
    :money-codes="store.currentReport.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { onMounted, watch } from "vue";
import { countResultForMoneyCode } from "@/helpers/reports/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/helpers/reports/countProfitForMoneyCode";
import { resultsColumns } from "@/components/table/columns/";
import Payments from "@/components/paymentsInformation/PaymentsInformation";

import ButtonDownloadReport from "./buttonDownloadReport/ButtonDownloadReport";
import PaymentTable from "@/components/table/DefaultTable";
import {formatNumber} from "@/helpers/formatNumber";
import AppInformer from "@/components/appInformer/AppInformer";

const getReportResults = () => {
  return [
    ...store.currentReport.moneyCodes.map((code) => {
      return {
        moneyCode: code,
        result: formatNumber(countResultForMoneyCode(store.currentReport, code) || ""),
        profit: formatNumber(countProfitForMoneyCode(store.currentReport, code) || ""),
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

