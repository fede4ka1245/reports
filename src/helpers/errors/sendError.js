import * as Sentry from "@sentry/browser";
import { store } from "@/store/store"
import {hasInternetConnection} from "@/helpers/hasInternetConnection";
import {getItem, setItem, storageKey} from "@/helpers/localStorage";
import { Device } from '@capacitor/device';
import {Capacitor} from "@capacitor/core";

export const sendError = async (error) => {
  const deviceInformation = Capacitor.isNativePlatform() ? await Device.getInfo() : {};

  const report = {
    errorName: error?.name || "unresolved error",
    error: String(error),
    currentReport: JSON.stringify(store.currentReport),
    allReports: JSON.stringify(store.allReports),
    deviceInformation: JSON.stringify(deviceInformation)
  }

  if (await hasInternetConnection()) {
    Sentry.captureMessage(JSON.stringify(error), () => {
      return report;
    });
  } else {
    if (getItem(storageKey.errors)) {
      const errors = getItem(storageKey.errors);

      setItem(storageKey.errors, [...errors, report]);
    } else {
      setItem(storageKey.errors, [report]);
    }
  }
}