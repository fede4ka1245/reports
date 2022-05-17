import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router/router";

const app = createApp(App)

app.use(router)
app.use(Quasar, quasarUserOptions)

app.mount("#app")
