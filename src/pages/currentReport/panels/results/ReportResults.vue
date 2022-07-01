<template>
  <button-download-report />
  <payment-table
    :columns="resultsColumns"
    :rows="store.currentReport.balance"
  />
  <section>
    <div class="flex no-wrap margin-vertical">
      <div class="text-grey-8">
        <q-icon size="30px" name="error"/>
      </div>
      <div>
        <p>
          <strong>Итого =</strong> вкладка сборы - вкладка расходы - доходы инструктора
        </p>
        <p>
          <strong>Итого на руках = Итого</strong> - передачи инструкторам/кураторам/офису
        </p>
      </div>
    </div>
  </section>
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

<style scoped>
.margin-vertical {
  margin: 20px 0;
}
</style>
