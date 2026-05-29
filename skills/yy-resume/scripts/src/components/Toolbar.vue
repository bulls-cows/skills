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

<style scoped>
@use '../styles/editor' as *;
</style>
