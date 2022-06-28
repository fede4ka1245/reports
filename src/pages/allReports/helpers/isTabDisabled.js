import {store} from "@/store/store";

export const isTabDisabled = (index) => {
  if (index === 0) {
    return false
  }

  return !(store.allReports.reports.length > 0 || store.currentReport)
}