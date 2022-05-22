<script setup>
import { store } from "@/store/store";
import MoneyCodeSelect from "./MoneyCodeSelect";
import { reactive, computed } from "vue";
import { getRoutes } from "@/api/getRoutes";

async function routesHandler(_, update) {
  if (commonData.routes.length) {
    update();
    return;
  }

  const routes = await getRoutes();
  console.log(routes);

  update(() => {
    commonData.routes = routes;
  });
}

const commonData = reactive({
  routes: [],
});
const datesOptions = computed(() => {
  if (!store.currentReportStore.route) {
    return [];
  }

  return store.currentReportStore.route.hikes;
});
</script>

<template>
  <q-select
    v-model="store.currentReportStore.route"
    :options="commonData.routes"
    option-label="name"
    class="item"
    outlined
    label="Событие"
    @filter="routesHandler"
  />
  <q-select
    v-model="store.currentReportStore.hike"
    :options="datesOptions"
    :option-label="(item) => item.beginDate + '-' + item.endDate"
    class="item"
    outlined
    label="Дата"
  />
  <q-input
    v-model="store.currentReportStore.members"
    class="item"
    outlined
    label="Реальное количество участников"
  />
  <q-input
    v-model="store.currentReportStore.inactiveMembers"
    class="item"
    outlined
    label="Не явившиеся участники"
  />
  <p>Валюты для этого отчета:</p>
  <money-code-select />
</template>

<style scoped>
.item {
  padding: 0 0 1em 0;
}
</style>
