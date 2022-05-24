<template>
  <button-download-report />
  <section class="table">
    <q-table :columns="resultColumns" :rows="resultRows" />
  </section>
  <section class="table">
    <p>Доходы интсруктора</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.instructorsRevenue"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            saveData: (payment) =>
              (store.currentReportStore.instructorsRevenue = [
                ...store.currentReportStore.instructorsRevenue,
                payment,
              ]),
          })
      "
    />
  </section>
  <section class="table">
    <p>Передано инструкторам</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsToInstructors"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            saveData: (payment) =>
              (store.currentReportStore.paymentsToInstructors = [
                ...store.currentReportStore.paymentsToInstructors,
                payment,
              ]),
          })
      "
    />
  </section>
  <section class="table">
    <p>Передано куратоорам</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsToTutors"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            payer: 'участник',
            saveData: (payment) =>
              (store.currentReportStore.paymentsToTutors = [
                ...store.currentReportStore.paymentsToTutors,
                payment,
              ]),
          })
      "
    />
  </section>
  <section class="table">
    <p>Передано в офис</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsToOffice"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            payer: 'участник',
            saveData: (payment) =>
              (store.currentReportStore.paymentsToOffice = [
                ...store.currentReportStore.paymentsToOffice,
                payment,
              ]),
          })
      "
    />
  </section>
</template>

<script setup>
import { store } from "@/store/store";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { computed } from "vue";
import { modalName } from "@/modalPages/utils/modalName";
import { countResultForMoneyCode } from "@/modules/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/modules/countProfitForMoneyCode";

import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import ButtonDownloadReport from "./buttonDownloadReport/ButtonDownloadReport";

const resultColumns = [
  {
    align: "left",
    name: "moneyCode",
    field: "moneyCode",
    label: "Валюта",
    sortable: true,
  },
  {
    align: "left",
    name: "result",
    field: "result",
    label: "Итого",
    sortable: true,
  },
  {
    align: "left",
    name: "profit",
    field: "profit",
    label: "Итого на руках",
  },
];

const columns = [
  {
    align: "left",
    name: "name",
    field: "name",
    label: "ФИО",
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

const resultRows = computed(() => {
  return [
    ...store.currentReportStore.moneyCodes.map((code) => {
      return {
        moneyCode: code,
        result: countResultForMoneyCode(store.currentReportStore, code),
        profit: countProfitForMoneyCode(store.currentReportStore, code),
      };
    }),
  ];
});
</script>

<style scoped></style>
