export type AppNavigationItem = {
  label: string;
  path: string;
  description: string;
};

const appNavigationItems: AppNavigationItem[] = [
  {
    label: "首页",
    path: "/home",
    description: "模板能力总览与开发入口",
  },
  {
    label: "UI 组件",
    path: "/ui",
    description: "基础组件展示与使用说明",
  },
];

export function useAppNavigation() {
  return {
    appNavigationItems,
  };
}
