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
import { getItem, setItem, storageKey } from "@/helpers/localStorage";
import { watch } from "vue";
import { getRoutes } from "@/api";

getRoutes().then((routes) => {
  console.log(routes);
});

onMounted(() => {
  console.log(getItem(storageKey.currentReport))
  if (
    getItem(storageKey.currentReport) &&
    getItem(storageKey.currentReport)?.key
  ) {
    store.currentReport = getItem(storageKey.currentReport);
  }
  if (getItem(storageKey.allReports)) {
    store.allReports = getItem(storageKey.allReports);
  }
});

watch(store, (store) => {
  console.log(store.currentReport)
  setItem(storageKey.currentReport, store.currentReport);
  setItem(storageKey.allReports, store.allReports);
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
