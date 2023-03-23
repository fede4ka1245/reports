<template>
  <div class="app">
    <div class="app-container">
      <router-view></router-view>
      <div>
        <modal-root />
      </div>
      <div class="tabbar-margin"></div>
      <app-tabbar />
      <q-dialog v-model="store.alert.isOpen">
        <q-card>
          <q-card-section
            style="
              width: 450px;
              max-width: calc(100vw - 48px);
              min-height: 40px;
              margin: 16px 0;
            "
            class="q-pt-none"
          >
            {{ store.alert.text }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn v-close-popup flat label="OK" color="primary" />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
import { appAlert } from "@/helpers/appAlert";

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
