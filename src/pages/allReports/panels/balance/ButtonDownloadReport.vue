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
  const report = await getMainReport(store.allReports);
  downloadXLSX(report, "Главный");
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  margin: 1em;
}
</style>
