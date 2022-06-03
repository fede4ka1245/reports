<template>
  <q-tabs
    v-model="index"
    narrow-indicator
    no-caps
    stretch
    dense
    align="center"
    mobile-arrows
    class="text-orange"
  >
    <q-route-tab
      v-for="(panel, index) in panels"
      :key="panel.label + index"
      :name="index"
      :icon="panel.icon"
      :label="panel.label"
      :to="`${routes.allReports.path}/${panel.route.path}`"
    >
    </q-route-tab>
  </q-tabs>
  <section class="content">
    <router-view></router-view>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { childRoutes } from "./childRoutes";
import { routes } from "@/router/router";
import { modifyBalance } from "@/pages/allReports/helpers";
import { store } from "@/store/store";

const panels = [
  {
    route: childRoutes.RoutesList,
    icon: "format_list_bulleted",
    label: "Список",
  },
  {
    route: childRoutes.incomingPayments,
    icon: "add",
    label: "Получено вне",
  },
  {
    route: childRoutes.outgoingPayments,
    icon: "remove",
    label: "Потрачено вне",
  },
  {
    route: childRoutes.balance,
    icon: "calculate",
    label: "Баланс",
  },
];

const index = ref(0);
watch(
  [
    store.allReportsStore.expenses,
    store.allReportsStore.outgoingPayments,
    store.allReportsStore.incomingPayments,
  ],
  modifyBalance
);
</script>

<style scoped>
.content {
  padding: 1em;
}
</style>
