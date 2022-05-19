<script setup>
import { ref } from "vue";
import { routes } from "@/router/router";

const tabs = [
  {
    name: 0,
    icon: "campaign",
    label: "Текущий",
    route: routes.current,
  },
  {
    name: 1,
    icon: "folder",
    label: "Все отчеты",
    route: routes.AllReports,
  },
  {
    name: 2,
    icon: "campaign",
    label: "Фидбэк",
    route: routes.feedback,
  },
];

const page = ref(tabs[0].name);
</script>

<template>
  <div class="app">
    <q-tabs
      v-model="page"
      narrow-indicator
      dense
      align="justify"
      class="text-orange"
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.label + tab.name"
        :name="tab.name"
        :icon="tab.icon"
        :label="tab.label"
        @click="$router.push(tab.route.path)"
      >
      </q-tab>
    </q-tabs>
  </div>
</template>

<style scoped>
.app {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f2ec;
}
</style>
