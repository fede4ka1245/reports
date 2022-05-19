<script setup>
import { store } from "@/store/store";
import MoneyCodeSelect from "./MoneyCodeSelect";
</script>

<template>
  <q-select v-model="store.eventName" class="item" outlined label="Событие" />
  <q-select v-model="store.date" class="item" outlined label="Дата" />
  <q-input
    v-model="store.members"
    class="item"
    outlined
    label="Реальное количество участников"
  />
  <q-input
    v-model="store.inactiveMembers"
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
