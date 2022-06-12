<template>
  <hike-main-info
    :hike="store.currentReport"
    :update-hike-name="
      (name) => {
        store.currentReport.name = name;
      }
    "
    :update-hike-information="
      (dates, hikeId) => {
        store.currentReport = {
          ...store.currentReport,
          dates,
          hikeId,
        };
      }
    "
  />
  <q-input
    v-model="store.currentReport.members"
    class="item"
    outlined
    label="Реальное количество участников"
  />
  <q-input
    v-model="store.currentReport.inactiveMembers"
    class="item"
    outlined
    label="Не явившиеся участники"
  />
  <p>Валюты для этого отчета:</p>
  <money-code-select
    :money-codes="store.currentReport.moneyCodes"
    :on-code-select="
      (code) => {
        store.currentReport.moneyCodes.push(code);
      }
    "
    :on-code-remove="
      (index) => {
        store.currentReport.moneyCodes.splice(index, 1);
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
