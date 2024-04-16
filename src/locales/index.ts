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
    locale: window.config.defaultLang,
    // legacy: false,
    // globalInjection: true,
    messages: messages,
});

export const langList = Object.keys(messages);

export type LangType = typeof i18n.global.locale;

export default i18n;
