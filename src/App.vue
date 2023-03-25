<template>
  <div class="app">
    <div class="app-container">
      <router-view></router-view>
      <div>
        <modal-root />
      </div>
      <div class="tabbar-margin"></div>
      <app-tabbar />
      <app-confirm />
      <app-alert />
    </div>
  </div>
</template>

<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
import ModalRoot from "@/modalPages/modalRoot/ModalRoot";
import { onMounted } from "vue";
import { store } from "./store/store";
import { getItem, setItem, storageKey } from "@/helpers/localStorage";
import { watch } from "vue";
import AppConfirm from "@/components/appConfirm/AppConfirm.vue";
import AppAlert from "@/components/appAlert/AppAlert.vue";
import { appAlert } from "@/components/appAlert/appAlert";

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
    appAlert(msg);
  };
});
</script>

<style>
* {
  overscroll-behavior-y: none;
}

body {
  background-color: #f5f2ec;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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

.app {
  height: 100vh;
  overflow: scroll;
}
</style>
