<template>
  <q-tabs
    v-model="index"
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
    >
    </q-route-tab>
  </q-tabs>
  <section class="content">
    <router-view v-if="store.currentReport"> </router-view>
    <EmptyReport v-else />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { childRoutes } from "@/pages/currentReport/childRoutes";
import { routes } from "@/router/router";
import { store } from "@/store/store";
import EmptyReport from "@/pages/currentReport/EmptyReport";

const panels = [
  {
    route: childRoutes.common,
    icon: "info",
    label: "Общее",
  },
  {
    route: childRoutes.payments,
    icon: "social_distance",
    label: "Сборы",
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
    route: childRoutes.summary,
    icon: "calculate",
    label: "Итог",
  },
];

const index = ref(0);
</script>

<style scoped>
.content {
  padding: 1em;
}
</style>
