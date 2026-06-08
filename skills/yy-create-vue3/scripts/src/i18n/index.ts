import { ref } from "vue";

import { messages } from "./messages";
import { logWarn } from "@src/utils/logUtils";
import type { AppLocale, I18nMessageKey } from "@src/typings/i18n";

export const currentLocale = ref<AppLocale>("zh-CN");

export function setLocale(locale: AppLocale): void {
  currentLocale.value = locale;
}

export function t(key: I18nMessageKey): string {
  const message = messages[currentLocale.value][key];

  if (message) {
    return message;
  }

  logWarn(`Missing i18n message: ${key}`);
  return key;
}
