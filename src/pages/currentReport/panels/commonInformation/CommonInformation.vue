<template>
  <hike-main-info
    :model="store.currentReportStore.routeData"
    :update-model="
      (newModel) => (store.currentReportStore.routeData = newModel)
    "
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
import HikeMainInfo from "../../../../components/hikeMainInfo/HikeMainInfo";
</script>

<style scoped>
.item {
  padding: 0 0 1em 0;
}
</style>
