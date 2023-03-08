import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router/router";
import { store } from "./store/store";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { Offline as OfflineIntegration } from "@sentry/integrations";

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
  dsn: process.env.SENTRY_URL,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
    new OfflineIntegration(),
  ],
  beforeSend: async (event, hint) => {
    const error = hint.originalException;

    event.extra = {
      errorName: error?.name || "unresolved error",
      error: String(error),
      currentReport: JSON.stringify(store.currentReport),
      allReports: JSON.stringify(store.allReports),
    };

    return event;
  },
  tracesSampleRate: 1.0,
});
