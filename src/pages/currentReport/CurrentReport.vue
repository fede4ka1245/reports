<template>
  <q-tabs
    v-model="targetTabIndex"
    no-caps
    stretch
    dense
    align="center"
    mobile-arrows
    active-class="text-orange"
  >
    <q-route-tab
      v-for="(panel, index) in panels"
      :key="panel.label + index"
      :name="index"
      :icon="panel.icon"
      :label="panel.label"
      :to="`${routes.current.path}/${panel.route.path}`"
      :disable="isTabDisable(index)"
      :ripple="false"
    >
    </q-route-tab>
  </q-tabs>
  <section class="content">
    <router-view v-if="store.currentReport"> </router-view>
    <EmptyReport v-else />
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { childRoutes } from "@/pages/currentReport/childRoutes";
import { routes } from "@/router/router";
import { store } from "@/store/store";
import EmptyReport from "@/pages/currentReport/EmptyReport";
import { isTabDisable } from "@/helpers/reports/isTabDisable";
import { formatNumber } from "@/helpers/formatNumber";
import { countResultForMoneyCode } from "@/helpers/reports/countResultForMoneyCode";
import { countResultForMoneyCodeWithIncomingPayments } from "@/helpers/reports/countResultForMoneyCodeWithIncomingPayments";
import { countFinalResult } from "@/helpers/reports/countFinalResult";

const panels = [
  {
    route: childRoutes.common,
    icon: "info",
    label: "Общее",
  },
  {
    route: childRoutes.payments,
    icon: "social_distance",
    label: "Получено",
  },
  {
    route: childRoutes.costs,
    icon: "payment",
    label: "Расходы",
  },
  {
    route: childRoutes.conversion,
    icon: "change_circle",
    label: "Конвертация",
  },
  {
    route: childRoutes.checkList,
    icon: "check",
    label: "Чеклист",
  },
  {
    route: childRoutes.summary,
    icon: "calculate",
    label: "Итог",
  },
];

const targetTabIndex = ref(0);

const getReportResults = () => {
  return [
    ...store.currentReport.moneyCodes.map((code) => {
      return {
        moneyCode: code,
        result: formatNumber(
          countResultForMoneyCode(store.currentReport, code) || 0
        ),
        resultWithIncomingPayments: formatNumber(
          countResultForMoneyCodeWithIncomingPayments(
            store.currentReport,
            code
          ) || 0
        ),
        finalResult: formatNumber(
          countFinalResult(store.currentReport, code) || 0
        ),
      };
    }),
  ];
};

watch(store.currentReport, () => {
  store.currentReport.balance = getReportResults();
});
</script>

<style scoped>
.content {
  padding: 1em;
}
</style>
