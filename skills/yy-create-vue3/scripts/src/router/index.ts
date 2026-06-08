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
    meta: {
      layout: "default",
      requireAuth: false,
    },
  },
  {
    path: "/ui",
    component: () => import("@src/views/UiView/UiView.vue"),
    redirect: "/ui/button",
    meta: {
      layout: "default",
      requireAuth: false,
    },
    children: [
      {
        path: "button",
        name: "ui-button",
        component: () => import("@src/views/UiView/ButtonDemoView.vue"),
      },
      {
        path: "input",
        name: "ui-input",
        component: () => import("@src/views/UiView/InputDemoView.vue"),
      },
      {
        path: "card",
        name: "ui-card",
        component: () => import("@src/views/UiView/CardDemoView.vue"),
      },
      {
        path: "tag",
        name: "ui-tag",
        component: () => import("@src/views/UiView/TagDemoView.vue"),
      },
      {
        path: "empty",
        name: "ui-empty",
        component: () => import("@src/views/UiView/EmptyDemoView.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeConfigList,
});
