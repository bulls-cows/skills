<template>
  <MainPageLayout
    title="Vue 3 应用骨架已就绪"
    description="该页面演示路由、布局、状态、Mock 请求和工程脚本的最小闭环，可在此基础上替换为业务页面。"
  >
    <div class="home-view">
      <div class="home-view__grid">
        <article v-for="item in featureItems" :key="item.title" class="home-view__card">
          <span class="home-view__card-index">{{ item.index }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </article>
      </div>

      <div class="home-view__actions">
        <button class="home-view__button" type="button" @click="toggleLoading">
          演示全局 Loading
        </button>
        <button
          class="home-view__button home-view__button--secondary"
          type="button"
          @click="showAlert"
        >
          全局 Alert
        </button>
        <button
          class="home-view__button home-view__button--secondary"
          type="button"
          @click="showToast"
        >
          全局 Toast
        </button>
        <code>npm run lint</code>
      </div>
    </div>
  </MainPageLayout>
</template>

<script setup lang="ts">
import MainPageLayout from "@src/components/MainPageLayout/MainPageLayout.vue";
import {
  doAlert,
  doGlobalLoading,
  doHideGlobalLoading,
  doToastSuccess,
} from "@src/utils/modalUtils";

const featureItems = [
  {
    index: "01",
    title: "通用壳层",
    description: "内置页头、侧边导航、内容区和页脚，路由通过 meta.layout 控制页面布局。",
  },
  {
    index: "02",
    title: "工程闭环",
    description: "保留 Vite、TypeScript、Vitest、ESLint、Oxlint、Prettier 与 LF 检查脚本。",
  },
  {
    index: "03",
    title: "Mock 请求",
    description: "开启 MOCK=1 后，/api/example/todo 会映射到 public/mock/example.todo.js。",
  },
];

function toggleLoading() {
  doGlobalLoading("正在加载模板示例...");
  window.setTimeout(() => {
    doHideGlobalLoading();
  }, 800);
}

async function showAlert() {
  await doAlert("全局 Alert 已接入模板项目。");
}

async function showToast() {
  await doToastSuccess("全局 Toast 已接入模板项目。");
}
</script>

<style scoped lang="scss">
.home-view {
  display: grid;
  gap: var(--space-16);
  border-radius: var(--radius-lg);

  &__card,
  &__actions {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.92);
    box-shadow: var(--shadow-panel);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-16);
  }

  &__card {
    display: grid;
    gap: var(--space-8);
    padding: var(--space-20);

    h2,
    p {
      margin: 0;
    }

    p {
      color: var(--color-text-muted);
    }
  }

  &__card-index {
    color: var(--color-secondary);
    font-size: 0.12rem;
    font-weight: 800;
  }

  &__actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-12);
    padding: var(--space-20);
  }

  &__button {
    padding: var(--space-8) var(--space-16);
    border-radius: var(--radius-md);
    color: #fff;
    font-weight: 800;
    background: var(--color-primary);
  }

  &__button--secondary {
    background: var(--color-secondary);
  }

  code {
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-sm);
    color: var(--color-text-muted);
    background: var(--color-surface-muted);
  }
}

@media (max-width: 960px) {
  .home-view {
    &__grid {
      grid-template-columns: 1fr;
    }

    &__actions {
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>
