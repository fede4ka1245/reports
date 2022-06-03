<template>
  <div class="button">
    <q-btn color="orange" @click="downloadClickHandler"> Скачать отчёт </q-btn>
  </div>
</template>

<script setup>
import { getHikeReport } from "@/modules/excel/reports/getHikeReport";
import { store } from "@/store/store";
import { countResultForMoneyCode } from "@/modules/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/modules/countProfitForMoneyCode";

const downloadClickHandler = () => {
  getHikeReport({
    hikeId: store.currentReportStore.hike?.id,
    hikeName: store.currentReportStore.route?.name,
    hikeDates:
      store.currentReportStore.hike?.beginDate +
      "-" +
      store.currentReportStore.hike?.endDate,
    activeMembers: store.currentReportStore.members,
    inactiveMembers: store.currentReportStore.inactiveMembers,
    result: [
      ...store.currentReportStore.moneyCodes.map((code) => {
        return {
          moneyCode: code,
          result: countResultForMoneyCode(store.currentReportStore, code),
          profit: countProfitForMoneyCode(store.currentReportStore, code),
        };
      }),
    ],
    outgoingPayments: store.currentReportStore.outgoingPayments,
    incomingPayments: store.currentReportStore.incomingPayments,
    commonPayments: store.currentReportStore.moneySums,
    expenses: store.currentReportStore.expenses,
    conversions: store.currentReportStore.conversions,
  });
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  margin: 1em;
}
</style>
