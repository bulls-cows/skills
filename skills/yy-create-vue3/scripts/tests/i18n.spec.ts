import { describe, expect, it } from "vitest";

import { currentLocale, setLocale, t } from "@src/i18n";

describe("i18n", () => {
  it("returns messages by current locale", () => {
    setLocale("zh-CN");
    expect(t("common.confirm")).toBe("确认");

    setLocale("en-US");
    expect(t("common.confirm")).toBe("Confirm");

    setLocale("zh-CN");
    expect(currentLocale.value).toBe("zh-CN");
  });
});
