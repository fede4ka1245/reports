<script setup>
import { ref } from "vue";
import { childRoutes } from "@/pages/currentReport/childRoutes";
import { useRouter } from "vue-router";
import { routes } from "@/router/router";

const panels = [
  {
    name: 1,
    route: childRoutes.common,
    icon: "folder",
    label: "Общее",
  },
  {
    name: 2,
    route: childRoutes.payments,
    icon: "folder",
    label: "Сборы",
  },
  {
    name: 3,
    route: childRoutes.costs,
    icon: "folder",
    label: "Расходы",
  },
  {
    name: 4,
    route: childRoutes.conversion,
    icon: "folder",
    label: "Конвертация",
  },
  {
    name: 5,
    route: childRoutes.summary,
    icon: "folder",
    label: "Итог",
  },
];

const router = useRouter();
const name = ref(panels[0].name);
</script>

<template>
  <q-tabs
    v-model="name"
    narrow-indicator
    dense
    align="justify"
    class="text-orange"
  >
    <q-tab
      v-for="panel in panels"
      :key="panel.name + panel.label"
      :name="panel.name"
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

<style scoped>
.content {
  padding: 1em;
}
</style>
