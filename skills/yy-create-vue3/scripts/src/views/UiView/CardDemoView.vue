<template>
  <article class="ui-demo">
    <section class="ui-demo__section">
      <h2>卡片 BaseCard</h2>
      <p>用于承载一组信息内容，可作为列表项、说明块或操作区域的基础容器。</p>
      <div class="ui-demo__preview ui-demo__preview--grid">
        <BaseCard title="标准卡片" description="展示标题、描述和默认内容。">
          <p>这里可以放置任意业务内容。</p>
        </BaseCard>
        <BaseCard title="悬浮卡片" description="hoverable 开启后支持悬浮反馈。" hoverable>
          <p>适合可点击列表或入口卡片。</p>
        </BaseCard>
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
        <div>title</div>
        <div>卡片标题</div>
        <div>string</div>
        <div>空字符串</div>
        <div>description</div>
        <div>卡片描述</div>
        <div>string</div>
        <div>空字符串</div>
        <div>hoverable</div>
        <div>是否启用悬浮反馈</div>
        <div>boolean</div>
        <div>false</div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import BaseCard from "@src/components/BaseCard/BaseCard.vue";

const usageCode = `<BaseCard title="标准卡片" description="展示标题、描述和默认内容。">
  <p>这里可以放置任意业务内容。</p>
</BaseCard>`;
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

  &__preview--grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-16);
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
  .ui-demo__preview--grid,
  .ui-demo__table {
    grid-template-columns: 1fr;
  }
}
</style>
