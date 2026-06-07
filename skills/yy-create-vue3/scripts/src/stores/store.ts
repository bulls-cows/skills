import { ref } from "vue";
import { cacheRef } from "@src/utils/storageUtils";

/**
 * 全局加载状态
 */
export const globalLoading = ref<boolean>(false);

/**
 * 全局加载提示文案
 */
export const globalLoadingTip = ref<string>("");

/**
 * 全局加载动画状态
 */
export const globalLoadingAnimation = ref<boolean>(true);

/**
 * 页面切换状态
 */
export const isPageMounting = ref<boolean>(false);

/**
 * 侧边导航折叠状态
 */
export const sidebarCollapsed = cacheRef<boolean>("sidebarCollapsed", false);
