import { ref } from "vue";
import { cacheRef } from "@src/scripts/storageUtils";

/**
 * 全局加载状态
 */
export const globalLoading = ref<boolean>(false);

/**
 * 页面切换状态
 */
export const isPageMounting = ref<boolean>(false);

/**
 * 侧边导航折叠状态
 */
export const sidebarCollapsed = cacheRef<boolean>("sidebarCollapsed", false);
