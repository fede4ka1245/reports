<template>
  <router-view></router-view>
  <div>
    <modal-root />
  </div>
  <div class="tabbar-margin"></div>
  {{ data.conversion }}
  <app-tabbar />
</template>

<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
import ModalRoot from "@/modalPages/modalRoot/ModalRoot";
import { onMounted, reactive } from "vue";
import { store } from "./store/store";
import { getItem, storageKey } from "@/modules/localStorage";
import { convertToRUB } from "@/modules/conversion/convertToRUB";

const data = reactive({
  conversion: 0,
});

convertToRUB(1, "USD", "01", "03", "2022").then(
  (result) => (data.conversion = result)
);

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
