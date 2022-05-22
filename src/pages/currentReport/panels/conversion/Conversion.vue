<script setup>
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { store } from "@/store/store";
import { computed } from "vue";

const columns = [
  {
    align: "left",
    name: "from",
    field: "from",
    label: "Из",
    sortable: true,
  },
  {
    align: "left",
    name: "to",
    field: "to",
    label: "В",
    sortable: true,
  },
  {
    align: "left",
    name: "rate",
    field: "rate",
    label: "Курс",
  },
  {
    align: "left",
    name: "date",
    field: "date",
    label: "Дата",
  },
];

const rows = computed(() => {
  return store.currentReportStore.conversions.map((row) => {
    return {
      from: `${row.from.sum} ${row.from.moneyCode}`,
      rate: `${(row.to.sum / row.from.sum).toFixed(5)}`,
      to: `${row.to.sum} ${row.to.moneyCode}`,
      date: row.date,
    };
  });
});
</script>

<template>
  <q-table :columns="columns" :rows="rows" />
  <button-add
    :handler="
      () =>
        openModalPage(modalName.addConversion, {
          saveData: (conversion) =>
            (store.currentReportStore.conversions = [
              ...store.currentReportStore.conversions,
              conversion,
            ]),
        })
    "
  />
</template>

<style scoped></style>
