<template>
  <div class="app-container">
    <router-view></router-view>
    <div>
      <modal-root />
    </div>
    <div class="tabbar-margin"></div>
    <app-tabbar />
  </div>
</template>

<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
import ModalRoot from "@/modalPages/modalRoot/ModalRoot";
import { onMounted } from "vue";
import { store } from "./store/store";
import { getItem, setItem, storageKey } from "@/helpers/localStorage";
import { watch } from "vue";

onMounted(() => {
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
  setItem(storageKey.currentReport, store.currentReport);
  setItem(storageKey.allReports, store.allReports);
});

onMounted(() => {
  window.onerror = (msg) => {
    alert(msg);
  };
});
</script>

<style>
* {
  overscroll-behavior-y: none;
  scroll-behavior: smooth;
}

body {
  background-color: #f5f2ec;
}

.tabbar-margin {
  margin: 4em;
}

.content {
  padding: 1em;
}

.app-container {
  max-width: 650px;
  margin: 0 auto;
}
</style>
