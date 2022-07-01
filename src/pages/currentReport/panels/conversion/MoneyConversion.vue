<template>
  <payment-table
    :columns="conversionsColumns"
    :rows="rows"
    :remove="remove"
    :edit="edit"
  />
  <button-add :handler="onConversionAdd" />
</template>

<script setup>
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import PaymentTable from "@/components/table/DefaultTable";

import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { modalName } from "@/modalPages/helpers/modalName";
import { store } from "@/store/store";
import { computed } from "vue";
import { conversionsColumns } from "@/components/table/columns";
import {formatNumber} from "@/helpers/formatNumber";

const onConversionAdd = () => {
  openModalPage(modalName.modalConversion, {
    saveData: (conversion) =>
      (store.currentReport.conversions = [
        ...store.currentReport.conversions,
        conversion,
      ]),
    moneyCodes: store.currentReport.moneyCodes,
  });
};

const remove = (index) => {
  store.currentReport.conversions.splice(index, 1);
};

const edit = (index) => {
  openModalPage(modalName.modalConversion, {
    saveData: (expense) => (store.currentReport.conversions[index] = expense),
    expense: store.currentReport.conversions[index],
    moneyCodes: store.currentReport.moneyCodes,
  });
};

const rows = computed(() => {
  return store.currentReport.conversions.map((row) => {
    return {
      from: `${formatNumber(row.from.sum)} ${row.from.moneyCode}`,
      rate: `${(row.to.sum / row.from.sum).toFixed(5)}`,
      to: `${formatNumber(row.to.sum)} ${row.to.moneyCode}`,
      date: row.date,
    };
  });
});
</script>

<style scoped></style>
