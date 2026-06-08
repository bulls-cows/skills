<template>
  <section class="ui-view">
    <header class="ui-view__hero">
      <p class="ui-view__eyebrow">Component Gallery</p>
      <h1 class="ui-view__title">UI 组件展示</h1>
      <p class="ui-view__description">
        这里集中展示模板内置基础组件的实际效果、使用示例和参数说明，便于复制到业务页面中复用。
      </p>
    </header>

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
  </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

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
    label: "空状态",
    path: "/ui/empty",
  },
];
</script>

<style scoped lang="scss">
.ui-view {
  display: grid;
  gap: var(--space-20);

  &__hero,
  &__tabs {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-panel);
  }

  &__hero {
    display: grid;
    gap: var(--space-8);
    padding: var(--space-32);
  }

  &__eyebrow {
    color: var(--color-primary);
    font-size: 0.12rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__title {
    font-family: var(--font-headline);
    font-size: clamp(0.28rem, 4vw, 0.42rem);
    line-height: 1.1;
  }

  &__description {
    max-width: 7.2rem;
    color: var(--color-text-muted);
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
    padding: var(--space-12);
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
