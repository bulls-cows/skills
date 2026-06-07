<template>
  <!-- 根容器 -->
  <div class="app">
    <!-- 工具栏：导出（JSON/HTML）、打印、停止服务 -->
    <Toolbar
      @reset-data="handleResetData"
      @import-json="handleImportJson"
      @download-json="handleDownloadJson"
      @download-html="handleDownloadHtml"
      @print="printResume"
      @stop-server="handleStopServer"
    />
    <!-- 主内容区：编辑器 + 预览 -->
    <div class="app__main-content">
      <!-- 可视化页面编辑器 -->
      <PageEditor
        :data="resumeData"
        @update:data="handleDataUpdate"
        @select-block="handleSelectBlock"
      />
      <!-- 简历实时预览 -->
      <ResumePreview :data="resumeData" :active-target="selectedPreviewTarget" />
    </div>
    <!-- 服务停止遮罩 -->
    <StopOverlay :visible="showStopOverlay" />
  </div>
</template>

<script setup lang="ts">
/**
 * App.vue - 简历编辑器根组件
 *
 * ## 组件职责
 * - 作为简历编辑器的顶层容器，协调子组件之间的数据流转
 * - 管理 JSON 简历数据的加载、编辑和导出流程
 *
 * ## 数据流向
 * - resumeData (cacheRef) 自动缓存到 localStorage，页面刷新后恢复
 * - 用户编辑 → PageEditor → handleDataUpdate → resumeData 更新 → 响应式驱动预览刷新
 *
 * ## 交互关系
 * - Toolbar: JSON 导入/导出、HTML 下载、打印、停止服务
 * - PageEditor: 可视化页面/区块编辑器
 * - ResumePreview: 简历实时预览
 * - StopOverlay: 服务停止后的全屏遮罩提示
 *
 * ## 核心业务流程
 * 1. 初始化：从 localStorage 恢复缓存数据，无缓存时使用 sampleData
 * 2. 编辑：用户在 PageEditor 中编辑 → 实时更新 → 刷新预览
 * 3. 导入导出：导入 JSON / 导出 JSON / 下载 HTML / 打印
 * 4. 停止：点击停止服务 → 显示遮罩 → 请求 /__stop-server 接口
 */

// --- Vue 核心 API ---
import { ref } from 'vue';

// --- 状态 ---
import { resumeData } from '@/stores/store';
import { sampleData } from '@/data/resume-data';

// --- 工具函数 ---
import { downloadJson, downloadHtml, printResume } from '@/utils/export';

// --- 子组件 ---
import Toolbar from './components/Toolbar.vue';
import PageEditor from './components/PageEditor.vue';
import ResumePreview from './components/ResumePreview.vue';
import StopOverlay from './components/StopOverlay.vue';

// --- 响应式状态 ---

// 服务停止遮罩层显示控制
const showStopOverlay = ref(false);

// 当前需要在预览区突出显示的区块
const selectedPreviewTarget = ref<{ pageId: string; blockId: string } | null>(null);

// --- 事件处理方法 ---

function handleDataUpdate(data: ResumeData) {
  resumeData.value = data;
}

function handleSelectBlock(target: { pageId: string; blockId: string } | null) {
  selectedPreviewTarget.value = target;
}

function handleDownloadJson() {
  downloadJson(resumeData.value);
}

async function handleImportJson(file: File) {
  try {
    const data = JSON.parse(await file.text()) as ResumeData;

    if (!isResumeData(data)) {
      window.alert('导入失败：JSON 数据结构不正确');
      return;
    }

    resumeData.value = data;
  } catch {
    window.alert('导入失败：请选择格式正确的 JSON 文件');
  }
}

function isResumeData(data: unknown): data is ResumeData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'pages' in data &&
    Array.isArray((data as ResumeData).pages)
  );
}

function handleDownloadHtml() {
  downloadHtml(resumeData.value);
}

async function handleStopServer() {
  showStopOverlay.value = true;
  try {
    await fetch('/__stop-server');
  } catch {
    // 服务关闭后连接中断是预期行为
  }
}

function handleResetData() {
  resumeData.value = JSON.parse(JSON.stringify(sampleData));
}
</script>

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

/* ====== 打印样式（scoped） ====== */
@media print {
  .app__main-content {
    display: block;
  }
}
</style>
