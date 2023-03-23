import { reactive } from "vue";
import { modalPages } from "./stores/modalPages";
import { allReports } from "@/store/stores/allReports";

export const store = reactive({
  currentReport: undefined,
  modalPages: modalPages,
  allReports: allReports,
  alert: {
    isOpen: false,
    text: "",
  },
  propmt: {
    isOpen: false,
    text: "",
    onSuccess: () => {},
    onCancel: () => {},
  },
});
