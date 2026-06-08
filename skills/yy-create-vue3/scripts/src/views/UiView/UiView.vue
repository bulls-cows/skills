<template>
  <MainPageLayout
    title="UI 组件展示"
    description="这里集中展示模板内置基础组件的实际效果、使用示例和参数说明，便于复制到业务页面中复用。"
  >
    <div class="ui-view">
      <nav class="ui-view__tabs" aria-label="组件分类导航">
        <RouterLink
          v-for="item in componentNavigationItems"
          :key="item.path"
          class="ui-view__tab"
          active-class="ui-view__tab--active"
          :to="item.path"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <RouterView />
    </div>
  </MainPageLayout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MainPageLayout from "@src/components/MainPageLayout/MainPageLayout.vue";

const componentNavigationItems = [
  {
    label: "按钮",
    path: "/ui/button",
  },
  {
    label: "输入框",
    path: "/ui/input",
  },
  {
    label: "卡片",
    path: "/ui/card",
  },
  {
    label: "标签",
    path: "/ui/tag",
  },
  {
    label: "表格",
    path: "/ui/table",
  },
  {
    label: "空状态",
    path: "/ui/empty",
  },
];
</script>

<style scoped lang="scss">
.ui-view {
  display: grid;
  gap: var(--space-16);
  border-radius: var(--radius-lg);

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
    padding: var(--space-12);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-panel);
  }

  &__tab {
    padding: var(--space-8) var(--space-12);
    border-radius: var(--radius-sm);
    color: var(--color-text-muted);
    font-weight: 800;
    background: transparent;
    transition:
      color 0.2s ease,
      background 0.2s ease;
  }

  &__tab--active,
  &__tab:hover {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }
}
</style>
