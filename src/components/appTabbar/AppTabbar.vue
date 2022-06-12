<script setup>
import { ref } from "vue";
import { routes } from "@/router/router";

const tabs = [
  {
    icon: "campaign",
    label: "Текущий",
    route: routes.current,
  },
  {
    icon: "folder",
    label: "Все отчеты",
    route: routes.allReports,
  },
  {
    icon: "campaign",
    label: "Фидбэк",
    route: routes.feedback,
  },
];

const targetTabIndex = ref(0);
</script>

<template>
  <div class="app">
    <q-tabs
      v-model="targetTabIndex"
      narrow-indicator
      dense
      align="justify"
      active-class="text-orange"
    >
      <q-route-tab
        v-for="(tab, tabIndex) in tabs"
        :key="tab.label + tabIndex"
        :name="tabIndex"
        :icon="tab.icon"
        :label="tab.label"
        :to="tab.route"
      >
      </q-route-tab>
    </q-tabs>
  </div>
</template>

<style scoped>
.app {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f2ec;
  z-index: 100;
}
</style>
