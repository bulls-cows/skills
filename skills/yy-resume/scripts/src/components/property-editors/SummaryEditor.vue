<script setup lang="ts">
/**
 * SummaryEditor - summary 区块属性编辑器
 *
 * 编辑个人简介标题和 HTML 内容
 */
defineProps<{
  blockTitle: string;
  summary: string;
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:summary', value: string): void;
}>();
</script>

<template>
  <div class="editor">
    <h3 class="editor__title">个人简介</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">内容（支持 HTML）</label>
      <textarea
        class="editor__textarea"
        :value="summary"
        @input="emit('update:summary', ($event.target as HTMLTextAreaElement).value)"
        rows="6"
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './editor-common';
</style>
