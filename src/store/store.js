import { reactive } from "vue";
import { commonReportStore } from "@/store/stores/commonReport/commonReportStore";
import { modalPagesStore } from "./stores/modalPages/modalPagesStore";

export const store = reactive({
  commonReportStore,
  modalPagesStore,
});
