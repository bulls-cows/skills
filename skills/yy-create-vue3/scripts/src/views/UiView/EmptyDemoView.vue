<template>
  <article class="ui-demo">
    <section class="ui-demo__section">
      <h2>空状态 BaseEmpty</h2>
      <p>用于列表、搜索或详情内容为空时给出明确反馈，可通过操作插槽承载下一步动作。</p>
      <div class="ui-demo__preview">
        <BaseEmpty title="暂无搜索结果" description="请更换关键词后重新查询。" icon="?">
          <template #action>
            <BaseButton variant="secondary">重置条件</BaseButton>
          </template>
        </BaseEmpty>
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
        <div>空状态标题</div>
        <div>string</div>
        <div>暂无数据</div>
        <div>description</div>
        <div>空状态说明</div>
        <div>string</div>
        <div>当前没有可展示的内容。</div>
        <div>icon</div>
        <div>图标文本</div>
        <div>string</div>
        <div>∅</div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import BaseButton from "@src/components/BaseButton/BaseButton.vue";
import BaseEmpty from "@src/components/BaseEmpty/BaseEmpty.vue";

const usageCode = `<BaseEmpty title="暂无搜索结果" description="请更换关键词后重新查询。">
  <template #action>
    <BaseButton variant="secondary">重置条件</BaseButton>
  </template>
</BaseEmpty>`;
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
