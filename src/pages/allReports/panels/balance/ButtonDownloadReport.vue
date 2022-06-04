<template>
  <div class="button">
    <q-btn color="orange" @click="downloadClickHandler"> Скачать отчёт </q-btn>
  </div>
</template>

<script setup>
import { store } from "@/store/store";
import { getMainReport } from "@/modules/excel/reports/getMainReport";

const downloadClickHandler = () => {
  getMainReport(store.allReportsStore);
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  margin: 1em;
}
</style>
