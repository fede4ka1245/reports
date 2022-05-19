<script setup>
import { ref } from "vue";
import { store } from "@/store/store";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";

const rows = ref([]);
const columns = [
  {
    align: "left",
    name: "member",
    field: "member",
    label: "Участник",
    sortable: true,
  },
  {
    align: "left",
    name: "sum",
    field: "sum",
    label: "Сумма",
    sortable: true,
  },
  {
    align: "left",
    name: "comment",
    field: "comment",
    label: "Комментарий",
  },
];
</script>

<template>
  <p>Сумма оплат</p>
  <section v-for="code in store.moneyCodes">
    <q-input class="sum" outlined />
    <q-select class="code" outlined :label="code" />
  </section>
  <section class="table">
    <p>оплаты участников с исключениями</p>
    <q-table :columns="columns" :rows="rows" />
    <button-add />
  </section>
  <section class="table">
    <p>получено от инструкторов</p>
    <q-table :columns="columns" :rows="rows" />
    <button-add />
  </section>
  <section class="table">
    <p>получено от кураторов</p>
    <q-table :columns="columns" :rows="rows" />
    <button-add />
  </section>
  <section class="table">
    <p>получено из офиса</p>
    <q-table :columns="columns" :rows="rows" />
    <button-add />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.sum {
  width: 70%;
}

.code {
  width: 30%;
}

h6 {
  margin: 5px;
}

.table {
  display: flex;
  flex-direction: column;
}
</style>
