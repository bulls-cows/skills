import { globalLoading, globalLoadingAnimation, globalLoadingTip } from "@src/stores/store";

export function useGlobalLoading() {
  const showGlobalLoading = (tip: string) => {
    globalLoading.value = !!tip;
    globalLoadingTip.value = tip;
    globalLoadingAnimation.value = !!tip;
  };

  const showGlobalStatic = (tip: string) => {
    globalLoading.value = !!tip;
    globalLoadingTip.value = tip;
    globalLoadingAnimation.value = false;
  };

  const hideGlobalLoading = () => {
    globalLoading.value = false;
    globalLoadingTip.value = "";
    globalLoadingAnimation.value = true;
  };

  return {
    isLoading: globalLoading,
    loadingTip: globalLoadingTip,
    showAnimation: globalLoadingAnimation,
    globalLoading: showGlobalLoading,
    globalStatic: showGlobalStatic,
    hideGlobalLoading,
  };
}
