import { createRouter, createWebHistory } from "vue-router";

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
    history: createWebHistory(),
    routes: routes,
});

export default router;
