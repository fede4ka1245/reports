import { reactive, watch } from "vue";
import { currentReportStore } from "@/store/stores/currentReportStore";
import { modalPagesStore } from "./stores/modalPagesStore";
import { allReportsStore } from "@/store/stores/allReportsStore";
import { storageKey, setItem } from "@/modules/localStorage";

export const store = reactive({
  currentReportStore,
  modalPagesStore,
  allReportsStore,
});

watch(store, (currentReport) => {
  setItem(storageKey.currentReport, currentReport);
});
