<template>
  <balance-table :rows="resultRows" :edit="editTime" />
  <button-download-report />
</template>

<script setup>
import { store } from "@/store/store";
import { computed, onMounted } from "vue";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import ButtonDownloadReport from "./components/buttonDownloadReport/ButtonDownloadReport";
import { modalName } from "@/modalPages/helpers/modalName";
import { modifyBalance } from "@/pages/allReports/helpers";
import { formatNumber } from "@/helpers/formatNumber";
import BalanceTable from "@/pages/allReports/panels/balance/components/balanceTable/BalanceTable";

const editTime = (index) => {
  const moneyCode = Object.keys(store.allReports.balance)[index];
  const balance = store.allReports.balance[moneyCode];

  openModalPage(modalName.modalTime, {
    onConfirm: async (day, month, year) => {
      balance.date = `${day}.${month}.${year}`;
      store.allReports.isBalanceLoading = true;
      await modifyBalance();
      store.allReports.isBalanceLoading = false;
    },
  });
};

const resultRows = computed(() => {
  const rows = [];
  const entries = Array.from(Object.entries(store.allReports.balance));

  for (const [moneyCode, balance] of entries) {
    let convertedSum;

    if (moneyCode === "RUB") {
      convertedSum = formatNumber(balance.sum || "") + " RUB";
    } else {
      convertedSum = balance.convertedSum
        ? formatNumber(balance.convertedSum || "") + " RUB"
        : "";
    }

    rows.push({
      moneyCode,
      sum: formatNumber(balance.sum) + " " + moneyCode,
      date:
        moneyCode === "RUB"
          ? "-"
          : balance.date || "Укажите дату для конвертации",
      convertedSum,
    });
  }

  return rows;
});

onMounted(async () => {
  store.allReports.isBalanceLoading = true;
  await modifyBalance();
  store.allReports.isBalanceLoading = false;
});
</script>

<style scoped></style>
