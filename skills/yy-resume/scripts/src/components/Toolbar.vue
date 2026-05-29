<script setup lang="ts">
import { profiles } from '@/data/profiles'

defineProps<{
  template: string
}>()

const emit = defineEmits<{
  (e: 'update:template', value: string): void
  (e: 'downloadJson'): void
  (e: 'downloadHtml'): void
  (e: 'print'): void
}>()

const templateOptions = [
  { value: 'general', label: '通用模板' },
  { value: 'frontend', label: '前端开发' },
  { value: 'backend', label: '后端开发' },
  { value: 'fullstack', label: '全栈开发' },
  { value: 'pharma-regulatory', label: '国际药品注册' },
  { value: 'bioinformatics', label: '生物信息学' },
]
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <span class="toolbar-title">简历编辑器</span>
      <select
        class="template-select"
        :value="template"
        @change="emit('update:template', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="opt in templateOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div class="toolbar-right">
      <button class="btn btn-secondary" @click="emit('downloadJson')">下载 JSON</button>
      <button class="btn btn-primary" @click="emit('downloadHtml')">下载简历 HTML</button>
      <button class="btn btn-secondary" @click="emit('print')">打印</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  background: #fff;
  padding: 12px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }

  &-right {
    display: flex;
    gap: 10px;
  }
}

.template-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  background: #fff;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &-primary {
    background: #3b82f6;
    color: #fff;

    &:hover {
      background: #2563eb;
    }
  }

  &-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background: #e5e7eb;
    }
  }
}
</style>
