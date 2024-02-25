import { createRouter, createWebHashHistory } from "vue-router";

var routes = [
    {
        path: "/demo",
        name: "demo",
        component: () => import("../views/Demo.vue"),
    },
    {
        path: "/",
        name: "introduce",
        component: () => import("../views/Introduce.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;
