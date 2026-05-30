<script setup lang="ts">
/**
 * JsonEditor - JSON 简历数据编辑器
 *
 * 【职责】
 * 提供 JSON 编辑区域，支持实时输入、JSON 语法校验、防抖更新
 *
 * 【数据流向】
 * - 接收: modelValue (父组件传入的 JSON 字符串)
 * - 输出: update:modelValue (校验通过后更新)、error (解析错误)、clearError (错误清除)
 *
 * 【交互关系】
 * - 父组件通过 v-model 绑定数据
 * - 错误状态通过 emit('error') 通知父组件
 *
 * 【核心流程】
 * 用户输入 → 300ms 防抖 → JSON.parse 校验 → 校验通过 emit update:modelValue / 失败 emit error
 */
import { ref, watch } from 'vue';

// Props: 接收父组件 v-model 绑定的 JSON 字符串
const props = defineProps<{
  modelValue: string;
}>();

// Emits: 向父组件发送数据更新、错误通知
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'error', message: string): void;
  (e: 'clearError'): void;
}>();

// 编辑器内部绑定的值，用于隔离父组件与输入框的双向绑定
const editorValue = ref(props.modelValue);
// 编辑器状态提示文本
const status = ref('已就绪');

// 防抖定时器引用
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// 监听父组件 modelValue 变化，同步到编辑器内部值
watch(
  () => props.modelValue,
  val => {
    if (val !== editorValue.value) {
      editorValue.value = val;
    }
  }
);

// 输入处理：防抖校验 JSON 并触发相应事件
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
  <!-- 编辑器根容器 -->
  <div class="json-editor">
    <!-- 编辑器头部：标题 + 状态 -->
    <div class="json-editor__header">
      <span>编辑简历数据 (JSON)</span>
      <span class="json-editor__status">{{ status }}</span>
    </div>
    <!-- JSON 文本输入区域 -->
    <textarea
      class="json-editor__textarea"
      :value="editorValue"
      @input="handleInput"
      placeholder="在此编辑 JSON 数据..."
      spellcheck="false"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
/* 编辑器根容器 */
.json-editor {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  background: #fafafa;
}

/* 编辑器头部 */
.json-editor__header {
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

/* 编辑器状态文本 */
.json-editor__status {
  font-size: 12px;
  color: #6b7280;
}

/* JSON 文本输入区域 */
.json-editor__textarea {
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

/* 打印时隐藏编辑器 */
@media print {
  .json-editor {
    display: none !important;
  }
}
</style>
