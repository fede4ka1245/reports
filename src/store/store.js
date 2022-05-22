import { reactive } from "vue";
import { currentReportStore } from "@/store/stores/currentReport/currentReportStore";
import { modalPagesStore } from "./stores/modalPages/modalPagesStore";

export const store = reactive({
  currentReportStore,
  modalPagesStore,
});
