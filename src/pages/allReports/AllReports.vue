<template>
  <q-tabs
    v-model="targetTabIndex"
    narrow-indicator
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
      :to="`${routes.allReports.path}/${panel.route.path}`"
      :disable="isTabDisabled(index)"
      :ripple="false"
    >
    </q-route-tab>
  </q-tabs>
  <section class="content">
    <router-view></router-view>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { childRoutes } from "./childRoutes";
import { routes } from "@/router/router";
import { isTabDisabled } from "./helpers/isTabDisabled";

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

const targetTabIndex = ref(0);
</script>

<style scoped>
.content {
  padding: 1em;
}
</style>
