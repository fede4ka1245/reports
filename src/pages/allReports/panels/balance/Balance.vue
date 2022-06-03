<template>
  <button-download-report />
  <payment-table
    :columns="mainReportColumns"
    :rows="resultRows"
    :edit="editTime"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { computed, onMounted } from "vue";
import { mainReportColumns } from "@/components/table/columns";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import ButtonDownloadReport from "./ButtonDownloadReport";
import PaymentTable from "@/components/table/PaymentTable";
import { modalName } from "@/modalPages/utils/modalName";
import { modifyBalance } from "@/pages/allReports/helpers";

const editTime = (index) => {
  const moneyCode = Object.keys(store.allReportsStore.balance)[index];
  const balance = store.allReportsStore.balance[moneyCode];

  openModalPage(modalName.modalTime, {
    onConfirm: (day, month, year) => {
      balance.date = `${day}.${month}.${year}`;
      modifyBalance();
    },
  });
};

const resultRows = computed(() => {
  const rows = [];
  const entries = Array.from(Object.entries(store.allReportsStore.balance));

  for (const [moneyCode, balance] of entries) {
    rows.push({
      sum: balance.sum + " " + moneyCode,
      date: balance.date,
      convertedSum: balance.convertedSum,
    });
  }

  return rows;
});

onMounted(() => {
  modifyBalance();
});
</script>

<style scoped></style>
