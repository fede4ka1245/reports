<script setup>
import { ref } from "vue";
import { routes } from "@/router/router";
import { useRouter } from "vue-router";

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

const router = useRouter();
const targetTabIndex = ref(0);
const tabClickHandler = (tabIndex, path) => {
  if (tabIndex === targetTabIndex.value) {
    return;
  }
  router.push(path);
};
</script>

<template>
  <div class="app">
    <q-tabs
      v-model="targetTabIndex"
      narrow-indicator
      dense
      align="justify"
      class="text-orange"
    >
      <q-tab
        v-for="(tab, tabIndex) in tabs"
        :key="tab.label + tabIndex"
        :name="tabIndex"
        :icon="tab.icon"
        :label="tab.label"
        @click="tabClickHandler(tabIndex, tab.route.path)"
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
