import {hasInternetConnection} from "@/helpers/hasInternetConnection";
import * as Sentry from "@sentry/browser";
import {getItem, setItem, storageKey} from "@/helpers/localStorage";

export const sendCachedErrors = async () => {
  if (await hasInternetConnection() && getItem(storageKey.errors)) {
    const errors = getItem(storageKey.errors);

    errors.forEach((error) => {
      Sentry.withScope(function(scope) {
        scope.setExtra("error data", error);
        Sentry.captureMessage(error?.errorName);
      });
    })

    setItem(storageKey.errors, []);
  }
}