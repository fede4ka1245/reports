import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router/router";
import { store } from "./store/store";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { Offline as OfflineIntegration } from "@sentry/integrations";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((serviceWorker) => {
      console.log("Service Worker registered: ", serviceWorker);
    })
    .catch((error) => {
      console.error("Error registering the Service Worker: ", error);
    });
}

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Quasar, quasarUserOptions);

app.mount("#app");

Sentry.init({
  app,
  dsn: "https://d0083a8391be4737afb7bccfc1f7354f@o877535.ingest.sentry.io/6567756",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
    new OfflineIntegration(),
  ],
  beforeSend: async (event, hint) => {
    const error = hint.originalException;

    const deviceInformation = Capacitor.isNativePlatform()
      ? await Device.getInfo()
      : {};

    event.extra = {
      errorName: error?.name || "unresolved error",
      error: String(error),
      currentReport: JSON.stringify(store.currentReport),
      allReports: JSON.stringify(store.allReports),
      deviceInformation: JSON.stringify(deviceInformation),
    };

    return event;
  },
  tracesSampleRate: 1.0,
});
