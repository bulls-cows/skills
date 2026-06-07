import { ref } from "vue";

const isAlertVisible = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

let alertResolver: ((action: ActionDoAlert) => void) | null = null;

export function useGlobalAlert() {
  const openAlert = (payload: ParamsDoAlert): Promise<ActionDoAlert> => {
    if (alertResolver) {
      alertResolver("closed");
      alertResolver = null;
    }

    alertTitle.value = payload.title ?? "";
    alertMessage.value = payload.message;
    isAlertVisible.value = true;

    return new Promise<ActionDoAlert>((resolve) => {
      alertResolver = resolve;
    });
  };

  const resolveAlert = (action: ActionDoAlert) => {
    isAlertVisible.value = false;

    const resolver = alertResolver;
    alertResolver = null;
    resolver?.(action);
  };

  const confirmAlert = () => {
    resolveAlert("confirmed");
  };

  const closeAlert = () => {
    resolveAlert("closed");
  };

  return {
    isAlertVisible,
    alertTitle,
    alertMessage,
    openAlert,
    confirmAlert,
    closeAlert,
  };
}
