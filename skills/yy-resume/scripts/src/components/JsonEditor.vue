<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'error', message: string): void
  (e: 'clearError'): void
}>()

const editorValue = ref(props.modelValue)
const status = ref('已就绪')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (val) => {
    if (val !== editorValue.value) {
      editorValue.value = val
    }
  }
)

function handleInput() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    try {
      JSON.parse(editorValue.value)
      emit('update:modelValue', editorValue.value)
      emit('clearError')
      status.value = '已更新'
      setTimeout(() => (status.value = '已就绪'), 1000)
    } catch (e) {
      emit('error', `JSON 解析错误: ${(e as Error).message}`)
      status.value = '解析错误'
    }
  }, 300)
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

<style scoped>
@use '../styles/editor' as *;
</style>
