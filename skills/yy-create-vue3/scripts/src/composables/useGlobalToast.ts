import { ref } from "vue";

const isToastVisible = ref(false);
const toastTitle = ref("");
const toastMessage = ref("");
const toastType = ref<ParamsDoToast["type"]>("info");

let toastTimer: number | undefined;

export function useGlobalToast() {
  const hideToast = () => {
    isToastVisible.value = false;
    toastTitle.value = "";
    toastMessage.value = "";
    toastType.value = "info";

    if (toastTimer !== undefined) {
      window.clearTimeout(toastTimer);
      toastTimer = undefined;
    }
  };

  const showToast = async (payload: ParamsDoToast): Promise<void> => {
    if (toastTimer !== undefined) {
      window.clearTimeout(toastTimer);
      toastTimer = undefined;
    }

    toastTitle.value = payload.title ?? "";
    toastMessage.value = payload.message;
    toastType.value = payload.type;
    isToastVisible.value = true;

    toastTimer = window.setTimeout(() => {
      hideToast();
    }, payload.duration ?? 2400);
  };

  return {
    isToastVisible,
    toastTitle,
    toastMessage,
    toastType,
    showToast,
    hideToast,
  };
}
