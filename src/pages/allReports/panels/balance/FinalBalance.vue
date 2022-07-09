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
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import ButtonDownloadReport from "./ButtonDownloadReport";
import PaymentTable from "@/components/table/DefaultTable";
import { modalName } from "@/modalPages/helpers/modalName";
import { modifyBalance } from "@/pages/allReports/helpers";
import {formatNumber} from "@/helpers/formatNumber";

const editTime = (index) => {
  const moneyCode = Object.keys(store.allReports.balance)[index];
  const balance = store.allReports.balance[moneyCode];

  openModalPage(modalName.modalTime, {
    onConfirm: (day, month, year) => {
      balance.date = `${day}.${month}.${year}`;
      modifyBalance();
    },
  });
};

const resultRows = computed(() => {
  const rows = [];
  const entries = Array.from(Object.entries(store.allReports.balance));

  for (const [moneyCode, balance] of entries) {
    rows.push({
      moneyCode,
      sum: formatNumber(balance.sum) + " " + moneyCode,
      date: moneyCode === "RUB" ? "-" : balance.date || "Укажите дату для конвертации",
      convertedSum: balance.convertedSum ? formatNumber(balance.convertedSum || "") + " RUB" : "",
    });
  }

  return rows;
});

onMounted(() => {
  modifyBalance();
});
</script>

<style scoped></style>
