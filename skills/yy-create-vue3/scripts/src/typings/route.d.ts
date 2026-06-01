import "vue-router";

declare global {
  type RouteConfigLayout = "default" | "fullscreen" | "login";
}

declare module "vue-router" {
  interface RouteMeta {
    layout: RouteConfigLayout;
    requireAuth: boolean;
  }
}
