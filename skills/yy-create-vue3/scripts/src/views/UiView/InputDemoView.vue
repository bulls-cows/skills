<template>
  <article class="ui-demo">
    <section class="ui-demo__section">
      <h2>输入框 BaseInput</h2>
      <p>用于收集单行文本，内置标签、辅助说明、错误提示和 v-model 双向绑定。</p>
      <div class="ui-demo__preview">
        <BaseInput
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          description="支持 2-20 个字符"
        />
        <BaseInput
          v-model="email"
          label="邮箱"
          placeholder="请输入邮箱"
          error="邮箱格式不正确"
          type="email"
        />
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
        <div>v-model</div>
        <div>输入框绑定值</div>
        <div>string</div>
        <div>空字符串</div>
        <div>label</div>
        <div>输入框标题</div>
        <div>string</div>
        <div>空字符串</div>
        <div>error</div>
        <div>错误提示文案</div>
        <div>string</div>
        <div>空字符串</div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@src/components/BaseInput/BaseInput.vue";

const username = ref("zhangsan");
const email = ref("demo@example");
const usageCode = `<BaseInput v-model="username" label="用户名" placeholder="请输入用户名" />
<BaseInput v-model="email" label="邮箱" error="邮箱格式不正确" type="email" />`;
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
    display: grid;
    gap: var(--space-16);
    max-width: 4.8rem;
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
