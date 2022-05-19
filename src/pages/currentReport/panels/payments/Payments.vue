<script setup>
import { ref } from "vue";
import { store } from "@/store/store";

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
  <q-table :columns="columns" :rows="rows" />
  <div class="flex justify-center">
    <q-btn class="button" icon="add" color="orange"> </q-btn>
  </div>
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

.button {
  border-radius: 50%;
  width: 3.5em;
  height: 3.5em;
  margin: 1em;
}
</style>
