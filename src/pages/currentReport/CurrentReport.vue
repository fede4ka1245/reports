<template>
  <q-tabs
    v-model="index"
    no-caps
    stretch
    dense
    align="center"
    mobile-arrows
    class="text-orange-9"
  >
    <q-tab
      v-for="(panel, index) in panels"
      :key="panel.label + index"
      :name="index"
      :icon="panel.icon"
      :label="panel.label"
      class="text-orange"
      @click="router.push(`${routes.current.path}/${panel.route.path}`)"
    >
    </q-tab>
  </q-tabs>
  <section class="content">
    <router-view></router-view>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { childRoutes } from "@/pages/currentReport/childRoutes";
import { useRouter } from "vue-router";
import { routes } from "@/router/router";

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

const router = useRouter();
const index = ref(0);
</script>

<style scoped>
.content {
  padding: 1em;
}
</style>
