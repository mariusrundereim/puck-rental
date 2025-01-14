import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue);
app.use(router);
app.use(pinia);

app.mount("#app");
