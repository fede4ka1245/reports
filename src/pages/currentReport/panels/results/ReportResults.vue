<template>
  <button-download-report />
  <current-report-table :rows="store.currentReport.balance" />
  <app-informer>
    <p>
      <strong>Итого =</strong> вкладка доходы - вкладка расходы - доходы
      инструктора
    </p>
    <p>
      <strong>Итого на руках = Итого</strong> - передачи
      инструкторам/кураторам/офису
    </p>
  </app-informer>
  <payments-information
    :payments="store.currentReport.outgoingPayments"
    :money-codes="store.currentReport.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { onMounted, watch } from "vue";
import { countResultForMoneyCode } from "@/helpers/reports/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/helpers/reports/countProfitForMoneyCode";
import PaymentsInformation from "@/components/paymentsInformation/PaymentsInformation";
import ButtonDownloadReport from "@/pages/currentReport/panels/results/components/buttonDownloadReport/ButtonDownloadReport";
import { formatNumber } from "@/helpers/formatNumber";
import AppInformer from "@/components/appInformer/AppInformer";
import CurrentReportTable from "@/pages/currentReport/panels/results/components/currentReportTable/CurrentReportTable";

const getReportResults = () => {
  return [
    ...store.currentReport.moneyCodes.map((code) => {
      return {
        moneyCode: code,
        result: formatNumber(
          countResultForMoneyCode(store.currentReport, code) || ""
        ),
        profit: formatNumber(
          countProfitForMoneyCode(store.currentReport, code) || ""
        ),
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
