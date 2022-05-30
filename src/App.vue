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
import { getItem, storageKey } from "@/modules/localStorage";

onMounted(() => {
  if (getItem(storageKey.currentReport)) {
    store.currentReportStore = getItem(
      storageKey.currentReport
    ).currentReportStore;
  }
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
