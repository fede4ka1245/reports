<template>
  <p>Сумма оплат</p>
  <section v-for="code in store.currentReportStore.moneyCodes">
    <q-input
      v-model="store.currentReportStore.moneySums[code]"
      class="sum"
      outlined
    />
    <q-select class="code" outlined :label="code" />
  </section>
  <section class="table">
    <p>оплаты участников с исключениями</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsFromMembers"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            payer: 'участник',
            saveData: (payment) =>
              (store.currentReportStore.paymentsFromMembers = [
                ...store.currentReportStore.paymentsFromMembers,
                payment,
              ]),
          })
      "
    />
  </section>
  <section class="table">
    <p>получено от инструкторов</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsFromInstructors"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            payer: 'участник',
            saveData: (payment) =>
              (store.currentReportStore.paymentsFromInstructors = [
                ...store.currentReportStore.paymentsFromInstructors,
                payment,
              ]),
          })
      "
    />
  </section>
  <section class="table">
    <p>получено от кураторов</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsFromTutors"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            payer: 'участник',
            saveData: (payment) =>
              (store.currentReportStore.paymentsFromTutors = [
                ...store.currentReportStore.paymentsFromTutors,
                payment,
              ]),
          })
      "
    />
  </section>
  <section class="table">
    <p>получено из офиса</p>
    <q-table
      :columns="columns"
      :rows="store.currentReportStore.paymentsFromOffice"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.paymentPreferences, {
            payer: 'участник',
            saveData: (payment) =>
              (store.currentReportStore.paymentsFromOffice = [
                ...store.currentReportStore.paymentsFromOffice,
                payment,
              ]),
          })
      "
    />
  </section>
</template>

<script setup>
import { store } from "@/store/store";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";

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
</script>

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
