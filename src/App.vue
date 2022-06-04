<template>
  <router-view></router-view>
  <div>
    <modal-root />
  </div>
  <div class="tabbar-margin"></div>
  <app-tabbar />
</template>

<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
import ModalRoot from "@/modalPages/modalRoot/ModalRoot";
import { onMounted } from "vue";
import { store } from "./store/store";
import { getItem, setItem, storageKey } from "@/modules/localStorage";
import { watch } from "vue";

onMounted(() => {
  if (getItem(storageKey.currentReport)) {
    store.currentReportStore = getItem(storageKey.currentReport);
  }
  if (getItem(storageKey.allReports)) {
    store.allReportsStore = getItem(storageKey.allReports);
  }
});

watch(store, (store) => {
  setItem(storageKey.currentReport, store.currentReportStore);
  setItem(storageKey.allReports, store.allReportsStore);
});
</script>

<style>
body {
  background-color: #f5f2ec;
}

.tabbar-margin {
  margin: 3em;
}

.content {
  padding: 1em;
}
</style>
