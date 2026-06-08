import type { AppLocale, I18nMessageKey } from "@src/typings/i18n";

export const messages: Record<AppLocale, Record<I18nMessageKey, string>> = {
  "zh-CN": {
    "app.title": "Vue3 模板项目",
    "common.cancel": "取消",
    "common.confirm": "确认",
    "common.empty": "暂无数据",
    "common.loading": "加载中",
    "common.selectPlaceholder": "请选择",
    "result.success": "操作成功",
    "result.error": "操作失败",
    "result.warning": "请注意",
    "result.info": "提示信息",
  },
  "en-US": {
    "app.title": "Vue3 Scaffold",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.empty": "No data",
    "common.loading": "Loading",
    "common.selectPlaceholder": "Please select",
    "result.success": "Success",
    "result.error": "Failed",
    "result.warning": "Warning",
    "result.info": "Information",
  },
};
