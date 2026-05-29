<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ResumeData } from '@/types/resume'
import { profiles, sampleData } from '@/data/profiles'
import { downloadJson, downloadHtml, printResume } from '@/utils/export'
import Toolbar from './Toolbar.vue'
import JsonEditor from './JsonEditor.vue'
import ResumePreview from './ResumePreview.vue'

const rawData = ref(JSON.stringify(sampleData, null, 2))
const errorMsg = ref('')
const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const parsedData = computed<ResumeData>(() => {
  try {
    return JSON.parse(rawData.value)
  } catch {
    return rawData.value as unknown as ResumeData
  }
})

const currentTemplate = computed(() => {
  try {
    return JSON.parse(rawData.value).template || 'general'
  } catch {
    return 'general'
  }
})

function handleJsonUpdate(value: string) {
  rawData.value = value
}

function handleError(msg: string) {
  errorMsg.value = msg
}

function handleClearError() {
  errorMsg.value = ''
}

function handleTemplateChange(tpl: string) {
  try {
    const data = JSON.parse(rawData.value)
    data.template = tpl
    rawData.value = JSON.stringify(data, null, 2)
  } catch {
    // ignore if JSON is invalid
  }
}

function handleDownloadJson() {
  try {
    downloadJson(JSON.parse(rawData.value))
  } catch {
    // ignore
  }
}

function handleDownloadHtml() {
  try {
    downloadHtml(JSON.parse(rawData.value))
  } catch {
    // ignore
  }
}
</script>

<template>
  <div class="app">
    <Toolbar
      :template="currentTemplate"
      @update:template="handleTemplateChange"
      @download-json="handleDownloadJson"
      @download-html="handleDownloadHtml"
      @print="printResume"
    />
    <div class="main-content">
      <JsonEditor
        :model-value="rawData"
        @update:model-value="handleJsonUpdate"
        @error="handleError"
        @clear-error="handleClearError"
      />
      <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
      <ResumePreview
        v-if="!errorMsg"
        :data="parsedData"
      />
    </div>
  </div>
</template>

<style scoped>
@use '../styles/editor' as *;
</style>
