import { createI18n } from "vue-i18n";

import zhCN from "./zh-CN";
import enUS from "./en-US";

const messages = {
    zhCN: {
        ...zhCN,
    },
    enUS: {
        ...enUS,
    },
};

const i18n = createI18n({
    locale: "enUS",
    fallbackLocale: "zhCn",
    // legacy: false,
    // globalInjection: true,
    messages: messages,
});

export default i18n;
