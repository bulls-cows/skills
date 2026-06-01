import { ref } from "vue";

/**
 * 全局加载状态
 */
export const globalLoading = ref<boolean>(false);

/**
 * 页面切换状态
 */
export const isPageMounting = ref<boolean>(false);
