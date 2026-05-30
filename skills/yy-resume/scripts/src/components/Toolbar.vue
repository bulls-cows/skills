<script setup lang="ts">
/**
 * Toolbar - 简历编辑器工具栏
 *
 * 【职责】
 * 提供模板选择、文件下载（JSON/HTML）、打印、停止服务等操作入口
 *
 * 【数据流向】
 * - 接收: template (当前选中的模板名称)
 * - 输出: update:template、downloadJson、downloadHtml、print、stopServer
 *
 * 【交互关系】
 * - 模板选择通过 emit('update:template') 通知父组件
 * - 下载/打印/停止服务通过对应 emit 触发父组件操作
 *
 * 【核心流程】
 * 用户选择模板 → emit update:template → 父组件更新简历模板
 * 用户点击下载/打印/停止 → emit 对应事件 → 父组件执行操作
 */

// Props: 当前选中的模板名称
defineProps<{
  template: string;
}>();

// Emits: 模板切换、下载、打印、停止服务事件
const emit = defineEmits<{
  (e: 'update:template', value: string): void;
  (e: 'downloadJson'): void;
  (e: 'downloadHtml'): void;
  (e: 'print'): void;
  (e: 'stopServer'): void;
}>();

// 模板选项列表
const templateOptions = [
  { value: 'general', label: '通用模板' },
  { value: 'frontend', label: '前端开发' },
  { value: 'backend', label: '后端开发' },
  { value: 'fullstack', label: '全栈开发' },
  { value: 'pharma-regulatory', label: '国际药品注册' },
  { value: 'bioinformatics', label: '生物信息学' },
];
</script>

<template>
  <!-- 工具栏根容器 -->
  <div class="toolbar">
    <!-- 工具栏左侧：标题 + 模板选择 -->
    <div class="toolbar__left">
      <span class="toolbar__title">简历编辑器</span>
      <select
        class="toolbar__template-select"
        :value="template"
        @change="emit('update:template', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="opt in templateOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
    <!-- 工具栏右侧：操作按钮组 -->
    <div class="toolbar__right">
      <button class="toolbar__btn toolbar__btn--secondary" @click="emit('downloadJson')">
        下载 JSON
      </button>
      <button class="toolbar__btn toolbar__btn--primary" @click="emit('downloadHtml')">
        下载简历 HTML
      </button>
      <button class="toolbar__btn toolbar__btn--secondary" @click="emit('print')">打印</button>
      <button class="toolbar__btn toolbar__btn--danger" @click="emit('stopServer')">
        停止服务
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 工具栏根容器 */
.toolbar {
  background: #fff;
  padding: 12px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 工具栏左侧区域 */
.toolbar__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 工具栏标题 */
.toolbar__title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

/* 工具栏右侧区域 */
.toolbar__right {
  display: flex;
  gap: 10px;
}

/* 模板选择器 */
.toolbar__template-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  background: #fff;
}

/* 工具栏按钮基础样式 */
.toolbar__btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

/* 主要按钮 */
.toolbar__btn--primary {
  background: #3b82f6;
  color: #fff;

  &:hover {
    background: #2563eb;
  }
}

/* 次要按钮 */
.toolbar__btn--secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;

  &:hover {
    background: #e5e7eb;
  }
}

/* 危险按钮 */
.toolbar__btn--danger {
  background: #ef4444;
  color: #fff;

  &:hover {
    background: #dc2626;
  }
}
</style>
