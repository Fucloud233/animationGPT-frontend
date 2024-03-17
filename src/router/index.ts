import { createRouter, createWebHistory } from "vue-router";
import { langList, LangType } from "../locales";

import i18n from "../locales";

var routes = [
    {
        path: "/:lang/demo",
        name: "demo",
        component: () => import("../views/Demo.vue"),
    },
    {
        path: "/:lang/",
        name: "introduce",
        component: () => import("../views/Introduce.vue"),
    },
    {
        path: "/",
        redirect: "/enUS/",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, _from, next) => {
    let lang = to.params.lang;

    if (typeof lang == "string") {
        // 如果设置的额语言不在支持中，则默认首选语言
        if (!langList.includes(lang)) {
            router.push({
                params: {
                    ...to.params,
                    lang: langList[0],
                },
            });
        }
        // 通过i18n修改语言
        i18n.global.locale = to.params.lang as LangType;
    }

    next();
});

export default router;
