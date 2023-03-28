<template>
  <app-informer>
    <p>
      <strong>Итог проведения =</strong> общая сумма оплат участников - расходы
      - доходы инструктора, и все это с учетом конвертации
    </p>
    <p>
      <strong>Итого с учетом получений =</strong> все то же, что и выше, только
      еще плюсуем получено от инструкторов/кураторов/офиса
    </p>
    <p>
      <strong>Баланс на руках после передач =</strong> все тоже, что и выше,
      только еще минусуем передано инструкторам/кураторам/офису
    </p>
  </app-informer>
  <div class="item">
    <current-report-table :rows="store.currentReport.balance" />
  </div>
  <payments-information
    :payments="
      store.currentReport.outgoingPayments.filter(
        (payment) => payment.label !== 'Доходы инструктора'
      )
    "
    :money-codes="store.currentReport.moneyCodes"
  />
  <button-download-report />
</template>

<script setup>
import { store } from "@/store/store";
import PaymentsInformation from "@/components/paymentsInformation/PaymentsInformation";
import ButtonDownloadReport from "@/pages/currentReport/panels/results/components/buttonDownloadReport/ButtonDownloadReport";
import AppInformer from "@/components/appInformer/AppInformer";
import CurrentReportTable from "@/pages/currentReport/panels/results/components/currentReportTable/CurrentReportTable";
</script>

<style scoped>
.item {
  margin-bottom: 15px;
}
</style>
