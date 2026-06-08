import { ref } from "vue";

const isLoading = ref<boolean>(false);
const loadingTip = ref<string>("");
const showAnimation = ref<boolean>(true);

export function useGlobalLoading() {
  const globalLoading = (tip: string) => {
    isLoading.value = !!tip;
    loadingTip.value = tip;
    showAnimation.value = !!tip;
  };

  const globalStatic = (tip: string) => {
    isLoading.value = !!tip;
    loadingTip.value = tip;
    showAnimation.value = false;
  };

  const hideGlobalLoading = () => {
    isLoading.value = false;
    loadingTip.value = "";
    showAnimation.value = true;
  };

  return {
    isLoading,
    loadingTip,
    showAnimation,
    globalLoading,
    globalStatic,
    hideGlobalLoading,
  };
}
