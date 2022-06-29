<template>
  <div class="button">
    <q-btn no-caps color="orange" @click="downloadMainReport"> Скачать общий отчёт </q-btn>
  </div>
</template>

<script setup>
import { downloadMainReport } from "@/helpers/downloadMainReport";
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  margin: 1em;
}
</style>
