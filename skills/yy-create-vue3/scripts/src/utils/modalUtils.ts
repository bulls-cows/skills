import { useGlobalAlert } from "@src/composables/useGlobalAlert";
import { useGlobalLoading } from "@src/composables/useGlobalLoading";
import { useGlobalToast } from "@src/composables/useGlobalToast";
import { logInfo } from "@src/utils/logUtils";

const { openAlert } = useGlobalAlert();
const { globalLoading, globalStatic, hideGlobalLoading } = useGlobalLoading();
const { showToast } = useGlobalToast();

export const doAlert = async (payload: string | ParamsDoAlert): Promise<ActionDoAlert> => {
  logInfo("doAlert", payload);

  if (typeof payload === "string") {
    return doAlert({
      title: "",
      message: payload,
    });
  }

  return openAlert(payload);
};

const doToast = async (payload: ParamsDoToast): Promise<void> => {
  logInfo("doToast", payload);
  return showToast(payload);
};

export const doToastSuccess = async (
  payload: string | Omit<ParamsDoToast, "type">,
): Promise<void> => {
  if (typeof payload === "string") {
    return doToastSuccess({
      title: "",
      message: payload,
    });
  }

  return doToast({
    type: "success",
    ...payload,
  });
};

export const doToastError = async (
  payload: string | Omit<ParamsDoToast, "type">,
): Promise<void> => {
  if (typeof payload === "string") {
    return doToastError({
      title: "",
      message: payload,
    });
  }

  return doToast({
    type: "error",
    ...payload,
  });
};

export const doToastWarning = async (
  payload: string | Omit<ParamsDoToast, "type">,
): Promise<void> => {
  if (typeof payload === "string") {
    return doToastWarning({
      title: "",
      message: payload,
    });
  }

  return doToast({
    type: "warning",
    ...payload,
  });
};

export const doToastInfo = async (payload: string | Omit<ParamsDoToast, "type">): Promise<void> => {
  if (typeof payload === "string") {
    return doToastInfo({
      title: "",
      message: payload,
    });
  }

  return doToast({
    type: "info",
    ...payload,
  });
};

export const doGlobalLoading = (tip: string): void => {
  globalLoading(tip);
};

export const doGlobalStatic = (tip: string): void => {
  globalStatic(tip);
};

export const doHideGlobalLoading = (): void => {
  hideGlobalLoading();
};
