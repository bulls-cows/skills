<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'error', message: string): void;
  (e: 'clearError'): void;
}>();

const editorValue = ref(props.modelValue);
const status = ref('已就绪');

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.modelValue,
  val => {
    if (val !== editorValue.value) {
      editorValue.value = val;
    }
  }
);

function handleInput() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    try {
      JSON.parse(editorValue.value);
      emit('update:modelValue', editorValue.value);
      emit('clearError');
      status.value = '已更新';
      setTimeout(() => (status.value = '已就绪'), 1000);
    } catch (e) {
      emit('error', `JSON 解析错误: ${(e as Error).message}`);
      status.value = '解析错误';
    }
  }, 300);
}
</script>

<template>
  <div class="editor-pane">
    <div class="editor-header">
      <span>编辑简历数据 (JSON)</span>
      <span class="editor-status">{{ status }}</span>
    </div>
    <textarea
      class="json-editor"
      :value="editorValue"
      @input="handleInput"
      placeholder="在此编辑 JSON 数据..."
      spellcheck="false"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
.editor-pane {
  width: 50%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  background: #fafafa;
}

.editor-header {
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-status {
  font-size: 12px;
  color: #6b7280;
}

.json-editor {
  flex: 1;
  min-height: 0;
  padding: 16px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  border: none;
  resize: none;
  background: #fafafa;
  outline: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
}

@media print {
  .editor-pane {
    display: none !important;
  }
}
</style>
