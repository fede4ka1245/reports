<template>
  <div class="button">
    <q-btn color="orange" @click="downloadClickHandler"> Скачать отчёт </q-btn>
  </div>
</template>

<script setup>
import { store } from "@/store/store";
import { getMainReport } from "@/helpers/excel/reports/getMainReport";
import { downloadXLSX } from "@/helpers/downloadXLSX";

const downloadClickHandler = async () => {
  const reportData = JSON.parse(JSON.stringify(store.allReports));
  if (store.currentReport) {
    reportData.reports.push(store.currentReport)
  }

  const xlsx = await getMainReport(reportData);
  downloadXLSX(xlsx, "Главный");
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  margin: 1em;
}
</style>
