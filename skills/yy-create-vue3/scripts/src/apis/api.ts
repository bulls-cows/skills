import { doRequest } from "@src/scripts/requestUtils";

export const getLocaleSettings = (): Promise<TReturn<BridgeLocaleSettings>> => {
  return doRequest<Record<string, never>, BridgeLocaleSettings>("settings.getLocale", undefined);
};

export const setPreferredLocale = (
  payload: ParamsRawBridgeSetPreferredLocale,
): Promise<TReturn<BridgeLocaleSettings>> => {
  return doRequest<ParamsRawBridgeSetPreferredLocale, BridgeLocaleSettings>(
    "settings.setPreferredLocale",
    payload,
  );
};
