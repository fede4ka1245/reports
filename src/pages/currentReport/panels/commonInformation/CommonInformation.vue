<template>
  <hike-main-info
    :hike="store.currentReport"
    :update-hike-name="updateHikeName"
    :update-hike-information="updateHikeInformation"
  />
  <q-input
    v-model="store.currentReport.members"
    class="item"
    outlined
    label="Реальное количество участников"
    type="number"
  />
  <q-input
    v-model="store.currentReport.inactiveMembers"
    class="item"
    outlined
    label="Не явившиеся участники"
    type="number"
  />
  <p>Валюты для этого отчета:</p>
  <money-code-select
    :money-codes="store.currentReport.moneyCodes"
    :on-code-select="onCodeSelect"
    :on-code-remove="onCodeRemove"
  />
</template>

<script setup>
import { store } from "@/store/store";
import MoneyCodeSelect from "@/components/moneyCodeSelect/MoneyCodeSelect";
import HikeMainInfo from "../../../../components/hikeMainInfo/HikeMainInfo";

const updateHikeName = (name) => {
  store.currentReport.name = name;
};

const updateHikeInformation = (dates, hikeId) => {
  store.currentReport = {
    ...store.currentReport,
    dates,
    hikeId,
  };
};

const onCodeRemove = (index) => {
  store.currentReport.moneyCodes.splice(index, 1);
};

const onCodeSelect = (code) => {
  store.currentReport.moneyCodes.push(code);
};
</script>

<style scoped>
.item {
  padding: 0 0 1em 0;
}
</style>
