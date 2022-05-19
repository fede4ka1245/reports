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
    route: routes.AllReports,
  },
  {
    icon: "campaign",
    label: "Фидбэк",
    route: routes.feedback,
  },
];

const page = ref(0);
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
        v-for="(tab, index) in tabs"
        :key="tab.label + index"
        :name="index"
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f2ec;
  z-index: 100;
}
</style>
