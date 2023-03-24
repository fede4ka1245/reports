<template>
  <div
    v-for="(checkListItem, index) in store.currentReport.checklist"
    :key="index"
    class="item"
  >
    <check-list-item
      :header="checkListItem.header"
      :comment="checkListItem.comment"
      :result="checkListItem.result"
      :hint="checkListItem.hint"
      :put-item="
        (newItem) => {
          store.currentReport.checklist[index] = {
            ...checkListItem,
            ...newItem,
          };
        }
      "
    />
  </div>
</template>

<script setup>
import { store } from "@/store/store";
import { hasPaymentsForMoneyCode } from "@/helpers/reports/hasPaymentsForMoneyCode";
import { useMutationEmitted } from "@/hooks/useMutationEmitted";
import { toCamelCase } from "@/helpers/toCamelCase";
import CheckListItem from "@/pages/currentReport/panels/checkList/CheckListItem.vue";

const selectOptions = ["Да", "Нет", "Не указано"];

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

const onInactiveMembersInputChange = (inactiveMembers) =>
  (store.currentReport.inactiveMembers = toCamelCase(inactiveMembers));
</script>

<style scoped>
.item {
  margin-bottom: 15px;
}
</style>
