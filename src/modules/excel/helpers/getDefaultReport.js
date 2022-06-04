import { currentReportStore } from "@/store/stores/currentReportStore";
import { nanoid } from "nanoid";

export const getDefaultReport = () => {
  return { ...currentReportStore, key: nanoid() };
};
