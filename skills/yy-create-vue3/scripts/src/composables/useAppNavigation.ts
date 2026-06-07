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
];

export function useAppNavigation() {
  return {
    appNavigationItems,
  };
}
