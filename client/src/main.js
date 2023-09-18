import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router/router";

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "@/assets/scss/main.scss";
import PrimeVue from "primevue/config";

import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(PrimeVue);

app.use(Vue3Toasity);

app.use(createPinia());
app.use(router);

app.mount("#app");
