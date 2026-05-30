<script setup lang="ts">
/**
 * App.vue - 简历编辑器根组件
 *
 * ## 组件职责
 * - 作为简历编辑器的顶层容器，协调子组件之间的数据流转
 * - 管理 JSON 简历数据的加载、编辑和导出流程
 *
 * ## 数据流向
 * - 单向数据流：rawData (JSON 字符串) → JSON.parse → parsedData (ResumeData)
 * - 用户编辑 → JsonEditor 组件 → handleJsonUpdate → rawData 更新 → 响应式驱动预览刷新
 * - 模板切换 → Toolbar 组件 → handleTemplateChange → rawData 内嵌 template 字段更新
 *
 * ## 交互关系
 * - Toolbar: 模板选择、JSON/HTML 下载、打印、停止服务
 * - JsonEditor: JSON 源码编辑与错误反馈
 * - ResumePreview: 简历实时预览，仅在无解析错误时显示
 * - StopOverlay: 服务停止后的全屏遮罩提示
 *
 * ## 核心业务流程
 * 1. 初始化：加载 sampleData 作为默认简历数据
 * 2. 编辑：用户在 JsonEditor 中编辑 JSON → 实时解析 → 更新预览
 * 3. 导出：下载 JSON / 下载 HTML / 打印
 * 4. 停止：点击停止服务 → 显示遮罩 → 请求 /__stop-server 接口
 */

// --- Vue 核心 API ---
import { ref, computed } from 'vue';

// --- 类型与内部数据 ---
import type { ResumeData } from '@/types/resume';
import { sampleData } from '@/data/profiles';

// --- 工具函数 ---
import { downloadJson, downloadHtml, printResume } from '@/utils/export';

// --- 子组件 ---
import Toolbar from './components/Toolbar.vue';
import JsonEditor from './components/JsonEditor.vue';
import ResumePreview from './components/ResumePreview.vue';
import StopOverlay from './components/StopOverlay.vue';

// --- 响应式状态 ---

// JSON 原始字符串，作为数据的唯一来源
const rawData = ref(JSON.stringify(sampleData, null, 2));

// JSON 解析错误信息，为空表示无错误
const errorMsg = ref('');

// 服务停止遮罩层显示控制
const showStopOverlay = ref(false);

// --- 计算属性 ---

// 解析后的结构化简历数据
const parsedData = computed<ResumeData>(() => {
  try {
    return JSON.parse(rawData.value);
  } catch {
    return rawData.value as unknown as ResumeData;
  }
});

// 当前选中的模板名称，默认使用 general
const currentTemplate = computed(() => {
  try {
    return JSON.parse(rawData.value).template || 'general';
  } catch {
    return 'general';
  }
});

// --- 事件处理方法 ---

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

async function handleStopServer() {
  showStopOverlay.value = true;
  try {
    await fetch('/__stop-server');
  } catch {
    // 服务关闭后连接中断是预期行为
  }
}
</script>

<template>
  <!-- 根容器 -->
  <div class="app">
    <!-- 工具栏：模板选择、导出（JSON/HTML）、打印、停止服务 -->
    <Toolbar
      :template="currentTemplate"
      @update:template="handleTemplateChange"
      @download-json="handleDownloadJson"
      @download-html="handleDownloadHtml"
      @print="printResume"
      @stop-server="handleStopServer"
    />
    <!-- 主内容区：编辑器 + 预览 -->
    <div class="app__main-content">
      <!-- JSON 源码编辑器 -->
      <JsonEditor
        :model-value="rawData"
        @update:model-value="handleJsonUpdate"
        @error="handleError"
        @clear-error="handleClearError"
      />
      <!-- JSON 解析错误提示 -->
      <div v-if="errorMsg" class="app__error-message">{{ errorMsg }}</div>
      <!-- 简历实时预览（无错误时显示） -->
      <ResumePreview v-if="!errorMsg" :data="parsedData" />
    </div>
    <!-- 服务停止遮罩 -->
    <StopOverlay :visible="showStopOverlay" />
  </div>
</template>

<style lang="scss">
/* ====== 全局重置 ====== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ====== 页面主体 ====== */
body {
  font-family:
    'Microsoft Yahei',
    -apple-system,
    BlinkMacSystemFont,
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif,
    Tahoma,
    serif;
  background: #464646;
  height: 100vh;
  overflow: hidden;
  color: #000;
  font-weight: 400;
}

html,
body,
#app {
  height: 100%;
}
/* ====== 应用根布局 ====== */
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ====== 打印样式 ====== */
@media print {
  .app {
    display: block;
    height: auto;
  }

  body {
    overflow: visible;
    height: auto;
    background: #fff;
  }
}
</style>

<style lang="scss" scoped>
/* ====== 主内容区布局 ====== */
.app__main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ====== JSON 解析错误提示 ====== */
.app__error-message {
  padding: 12px 16px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 13px;
  border-top: 1px solid #fca5a5;
}

/* ====== 打印样式（scoped） ====== */
@media print {
  .app__main-content {
    display: block;
  }

  :deep(.app__error-message) {
    display: none !important;
  }
}
</style>
