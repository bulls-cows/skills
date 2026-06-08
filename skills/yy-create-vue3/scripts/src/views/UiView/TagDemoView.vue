<template>
  <article class="ui-demo">
    <section class="ui-demo__section">
      <h2>标签 BaseTag</h2>
      <p>用于展示状态、分类和轻量标记，支持默认、主要、成功、警告和危险类型。</p>
      <div class="ui-demo__preview ui-demo__preview--inline">
        <BaseTag>默认</BaseTag>
        <BaseTag type="primary">主要</BaseTag>
        <BaseTag type="success">成功</BaseTag>
        <BaseTag type="warning">警告</BaseTag>
        <BaseTag type="danger">危险</BaseTag>
      </div>
    </section>

    <section class="ui-demo__section">
      <h3>使用示例</h3>
      <pre class="ui-demo__code"><code>{{ usageCode }}</code></pre>
    </section>

    <section class="ui-demo__section">
      <h3>参数说明</h3>
      <div class="ui-demo__table">
        <div>参数</div>
        <div>说明</div>
        <div>可选值</div>
        <div>默认值</div>
        <div>type</div>
        <div>标签视觉类型</div>
        <div>default / primary / success / warning / danger</div>
        <div>default</div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import BaseTag from "@src/components/BaseTag/BaseTag.vue";

const usageCode = `<BaseTag>默认</BaseTag>
<BaseTag type="success">成功</BaseTag>
<BaseTag type="danger">危险</BaseTag>`;
</script>

<style scoped lang="scss">
.ui-demo {
  display: grid;
  gap: var(--space-16);

  &__section {
    display: grid;
    gap: var(--space-12);
    padding: var(--space-24);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-panel);
  }

  &__section p {
    color: var(--color-text-muted);
  }

  &__preview {
    padding: var(--space-20);
    border-radius: var(--radius-md);
    background: var(--color-surface-muted);
  }

  &__preview--inline {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-12);
    align-items: center;
  }

  &__code {
    overflow: auto;
    padding: var(--space-16);
    border-radius: var(--radius-md);
    color: var(--color-primary-soft);
    background: var(--color-text);
    user-select: text;
  }

  &__code code {
    user-select: text;
  }

  &__table {
    display: grid;
    grid-template-columns: 0.9rem 1.5fr 2fr 0.9rem;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }

  &__table > div {
    padding: var(--space-8) var(--space-12);
    border-bottom: 1px solid var(--color-border);
  }

  &__table > div:nth-child(-n + 4) {
    color: var(--color-text);
    font-weight: 900;
    background: var(--color-surface-muted);
  }

  &__table > div:nth-last-child(-n + 4) {
    border-bottom: none;
  }
}

@media (max-width: 760px) {
  .ui-demo__table {
    grid-template-columns: 1fr;
  }
}
</style>
