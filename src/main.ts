import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";
import i18n from "./locales";

const app = createApp(App);
app.use(ElementPlus).use(router).use(i18n).mount("#app");
