<template>
  <payment-table
    :columns="conversionsColumns"
    :rows="rows"
    :remove="remove"
    :edit="edit"
  />
  <button-add
    :handler="
      () =>
        openModalPage(modalName.modalConversion, {
          saveData: (conversion) =>
            (store.currentReportStore.conversions = [
              ...store.currentReportStore.conversions,
              conversion,
            ]),
        })
    "
  />
</template>

<script setup>
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import PaymentTable from "@/components/table/PaymentTable";

import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { store } from "@/store/store";
import { computed } from "vue";
import { conversionsColumns } from "@/components/table/columns";

const remove = (index) => {
  store.currentReportStore.conversions.splice(index, 1);
};

const edit = (index) => {
  openModalPage(modalName.modalConversion, {
    saveData: (expense) =>
      (store.currentReportStore.conversions[index] = expense),
    expense: store.currentReportStore.conversions[index],
  });
};

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

<style scoped></style>
