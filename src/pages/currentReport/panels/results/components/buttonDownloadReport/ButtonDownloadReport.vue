<template>
  <div class="button">
    <q-btn
      no-caps
      color="orange"
      @click="downloadHikeReport(store.currentReport)"
    >
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
  margin: 3em 1em 1em 1em;
}
</style>
