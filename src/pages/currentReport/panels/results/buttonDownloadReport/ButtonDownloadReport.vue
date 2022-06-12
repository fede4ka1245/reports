<template>
  <div class="button">
    <q-btn color="orange" @click="downloadHikeReport(store.currentReport)">
      Скачать отчёт
    </q-btn>
  </div>
</template>

<script setup>
import { store } from "@/store/store";
import { downloadHikeReport } from "@/helpers/downloadHikeReport";
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  margin: 1em;
}
</style>
