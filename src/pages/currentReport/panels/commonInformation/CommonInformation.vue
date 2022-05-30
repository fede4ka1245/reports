<template>
  <q-select
    v-model="store.currentReportStore.route"
    :options="commonData.routes"
    :option-label="(item) => (item.name ? item.name : '')"
    class="item"
    outlined
    use-input
    label="Событие"
    @filter="filter"
  />
  <q-select
    v-model="store.currentReportStore.hike"
    :options="datesOptions"
    :option-label="
      (item) => (item.beginDate ? item.beginDate + '-' + item.endDate : '')
    "
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
  <money-code-select
    :money-codes="store.currentReportStore.moneyCodes"
    :on-code-select="
      (code) => {
        store.currentReportStore.moneyCodes.push(code);
      }
    "
    :on-code-remove="
      (index) => {
        store.currentReportStore.moneyCodes.splice(index, 1);
      }
    "
  />
</template>

<script setup>
import { store } from "@/store/store";
import MoneyCodeSelect from "@/components/moneyCodeSelect/MoneyCodeSelect";
import { reactive, computed } from "vue";
import { getRoutes } from "@/api/getRoutes";

const commonData = reactive({
  routes: [],
});
let routes = [];

async function filter(inputValue, update) {
  if (commonData.routes.length) {
    commonData.routes = routes.filter((route) =>
      route.name.toLowerCase().includes(inputValue)
    );
    update();
    return;
  }

  routes = await getRoutes();

  update(() => {
    commonData.routes = routes;
  });
}

const datesOptions = computed(() => {
  if (!store.currentReportStore.route) {
    return [];
  }

  return store.currentReportStore.route.hikes;
});
</script>

<style scoped>
.item {
  padding: 0 0 1em 0;
}
</style>
