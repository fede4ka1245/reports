<template>
  <section class="justify-center flex column">
    <p class="text-bold text-center">Нет отчетов. Создать?</p>
    <q-btn
      color="orange"
      label="Создать"
      class="button"
      @click="() => createReport()"
    ></q-btn>
  </section>
</template>

<script setup>
import { store } from "@/store/store";
import { useRouter } from "vue-router";
import { routes } from "@/router/router";
import { getEmptyReport } from "@/helpers/getEmptyReport";

const router = useRouter();

const createReport = () => {
  router.push(routes.current.path);
  store.currentReport = getEmptyReport();
};
</script>

<style scoped>
p {
  padding: 3em 0 0 0;
}

.button {
  margin: 0 auto 0 auto;
}
</style>
