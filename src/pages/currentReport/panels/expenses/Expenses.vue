<script setup>
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { store } from "@/store/store";

const columns = [
  {
    align: "left",
    name: "category",
    field: "category",
    label: "Категория",
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
  <q-table :columns="columns" :rows="store.currentReportStore.expenses" />
  <button-add
    :handler="
      () =>
        openModalPage(modalName.addExpense, {
          saveData: (expense) =>
            (store.currentReportStore.expenses = [
              ...store.currentReportStore.expenses,
              expense,
            ]),
        })
    "
  />
</template>

<style scoped></style>
