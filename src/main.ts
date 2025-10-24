import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import "../src/styles/global.scss";
const app = createApp(App);
app.use(createPinia()); // <= สำคัญมาก
app.use(router);
app.use(vuetify);
app.mount("#app");
