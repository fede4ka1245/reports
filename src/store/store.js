import { reactive, watch } from "vue";
import { modalPagesStore } from "./stores/modalPagesStore";
import { allReportsStore } from "@/store/stores/allReportsStore";
import { storageKey, setItem } from "@/modules/localStorage";

export const store = reactive({
  currentReportStore: undefined,
  modalPagesStore,
  allReportsStore,
});