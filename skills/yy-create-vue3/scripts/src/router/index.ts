import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routeConfigList: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@src/views/HomeView/HomeView.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeConfigList,
});
