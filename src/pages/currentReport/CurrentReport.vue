<template>
  <q-tabs
    v-model="index"
    narrow-indicator
    dense
    align="justify"
    class="text-orange"
  >
    <q-tab
      v-for="(panel, index) in panels"
      :key="panel.label + index"
      :name="index"
      :icon="panel.icon"
      :label="panel.label"
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
    icon: "folder",
    label: "Общее",
  },
  {
    route: childRoutes.payments,
    icon: "folder",
    label: "Сборы",
  },
  {
    route: childRoutes.costs,
    icon: "folder",
    label: "Расходы",
  },
  {
    route: childRoutes.conversion,
    icon: "folder",
    label: "Конвертация",
  },
  {
    route: childRoutes.summary,
    icon: "folder",
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
