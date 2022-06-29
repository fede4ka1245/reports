import { store } from "@/store/store";

export const isTabDisable = (index) => {
  if (index === 0) {
    return false;
  }

  return !store.currentReport;
};
