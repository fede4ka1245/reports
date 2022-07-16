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
    :model-value="store.currentReport.inactiveMembers"
    @update:model-value="onInactiveMembersInputChange"
    class="item"
    outlined
    label="Не явившиеся участники"
  />
  <p>Валюты для этого отчета:</p>
  <money-code-select
    :money-codes="store.currentReport.moneyCodes"
    :on-code-select="onCodeSelect"
    :on-code-remove="onCodeRemove"
  />
  <notification-data-saved v-if="isNotificationVisible" />
</template>

<script setup>
import { store } from "@/store/store";
import MoneyCodeSelect from "@/components/moneyCodeSelect/MoneyCodeSelect";
import HikeMainInfo from "@/components/hikeMainInfo/HikeMainInfo";
import { hasPaymentsForMoneyCode } from "@/helpers/reports/hasPaymentsForMoneyCode";
import NotificationDataSaved from "@/components/notificationDataSaved/NotificationDataSaved";
import { useMutationEmitted } from "@/hooks/useMutationEmitted";
import {toCamelCase} from "@/helpers/toCamelCase";

const updateHikeName = (name) => {
  store.currentReport.name = name;
};

const updateHikeInformation = (dates, hikeId) => {
  store.currentReport.dates = dates;
  store.currentReport.hikeId = hikeId;
};

const onCodeRemove = (index) => {
  if (hasPaymentsForMoneyCode(store.currentReport.moneyCodes[index])) {
    alert("Нельзя удалить использующуюся валюту");
  } else {
    store.currentReport.moneyCodes.splice(index, 1);
  }
};

const onCodeSelect = (code) => {
  if (store.currentReport?.moneyCodes?.includes(code)) {
    return;
  }
  store.currentReport.moneyCodes.push(code);
};

const isNotificationVisible = useMutationEmitted(store.currentReport);

const onInactiveMembersInputChange = (inactiveMembers) => store.currentReport.inactiveMembers = toCamelCase(inactiveMembers);
</script>

<style scoped>
.item {
  padding: 0 0 1em 0;
}
</style>
