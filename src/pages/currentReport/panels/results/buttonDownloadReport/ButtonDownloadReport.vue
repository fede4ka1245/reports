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
    outgoingPayments: [
      {
        name: "Доходы инструктора",
        payments: store.currentReportStore.instructorsRevenue,
      },
      {
        name: "Передано инструкторам",
        payments: store.currentReportStore.paymentsToTutors,
      },
      {
        name: "Передано кураторам",
        payments: store.currentReportStore.paymentsToInstructors,
      },
      {
        name: "Передано в офис",
        payments: store.currentReportStore.paymentsToOffice,
      },
    ],
    incomingPayments: [
      {
        name: "Оплаты участников с исключениями",
        payments: store.currentReportStore.paymentsFromMembers,
      },
      {
        name: "Получено от инструкторов",
        payments: store.currentReportStore.paymentsFromTutors,
      },
      {
        name: "Получено от кураторов",
        payments: store.currentReportStore.paymentsFromInstructors,
      },
      {
        name: "Получено из офиса",
        payments: store.currentReportStore.paymentsFromOffice,
      },
    ],
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
