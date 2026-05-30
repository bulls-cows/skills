<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ResumeData } from '@/types/resume';
import { sampleData } from '@/data/profiles';
import { downloadJson, downloadHtml, printResume } from '@/utils/export';
import Toolbar from './components/Toolbar.vue';
import JsonEditor from './components/JsonEditor.vue';
import ResumePreview from './components/ResumePreview.vue';
import StopOverlay from './components/StopOverlay.vue';

const rawData = ref(JSON.stringify(sampleData, null, 2));
const errorMsg = ref('');
const showStopOverlay = ref(false);
const parsedData = computed<ResumeData>(() => {
  try {
    return JSON.parse(rawData.value);
  } catch {
    return rawData.value as unknown as ResumeData;
  }
});

const currentTemplate = computed(() => {
  try {
    return JSON.parse(rawData.value).template || 'general';
  } catch {
    return 'general';
  }
});

function handleJsonUpdate(value: string) {
  rawData.value = value;
}

function handleError(msg: string) {
  errorMsg.value = msg;
}

function handleClearError() {
  errorMsg.value = '';
}

function handleTemplateChange(tpl: string) {
  try {
    const data = JSON.parse(rawData.value);
    data.template = tpl;
    rawData.value = JSON.stringify(data, null, 2);
  } catch {
    // ignore if JSON is invalid
  }
}

function handleDownloadJson() {
  try {
    downloadJson(JSON.parse(rawData.value));
  } catch {
    // ignore
  }
}

function handleDownloadHtml() {
  try {
    downloadHtml(JSON.parse(rawData.value));
  } catch {
    // ignore
  }
}

function handleStopServer() {
  showStopOverlay.value = true;
  fetch('/__stop-server').catch(() => {
    // 服务关闭后连接中断是预期行为
  });
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
      @stop-server="handleStopServer"
    />
    <div class="main-content">
      <JsonEditor
        :model-value="rawData"
        @update:model-value="handleJsonUpdate"
        @error="handleError"
        @clear-error="handleClearError"
      />
      <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
      <ResumePreview v-if="!errorMsg" :data="parsedData" />
    </div>
    <StopOverlay :visible="showStopOverlay" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f0f2f5;
  height: 100vh;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media print {
  .app {
    display: block;
    height: auto;
  }

  body {
    overflow: visible;
    height: auto;
  }
}
</style>

<style scoped>
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.error-message {
  padding: 12px 16px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 13px;
  border-top: 1px solid #fca5a5;
}

@media print {
  .main-content {
    display: block;
  }

  :deep(.error-message) {
    display: none !important;
  }
}
</style>
