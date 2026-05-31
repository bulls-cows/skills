<script setup lang="ts">
/**
 * PageEditor - 可视化页面/区块编辑器
 *
 * 三区域布局：
 * 顶部：页面标签（PageTabs）
 * 中部：区块列表（BlockList）
 * 底部：属性面板（BlockPropertyPanel）
 *
 * 数据流向：接收完整 ResumeData，通过 emit 回传修改后的完整数据
 */
import { ref, computed } from 'vue';
import type { ResumeData, BlockType } from '@/types/resume';
import PageTabs from './PageTabs.vue';
import BlockList from './BlockList.vue';
import BlockPropertyPanel from './BlockPropertyPanel.vue';

const props = defineProps<{
  data: ResumeData;
}>();

const emit = defineEmits<{
  (e: 'update:data', value: ResumeData): void;
}>();

// 当前选中的页面 ID
const currentPageId = ref(props.data.pages[0]?.id || '');

// 当前选中的区块 ID
const selectedBlockId = ref<string | null>(null);

// 当前页面
const currentPage = computed(() => {
  return props.data.pages.find(p => p.id === currentPageId.value) || props.data.pages[0];
});

// 当前选中的区块
const selectedBlock = computed(() => {
  if (!selectedBlockId.value || !currentPage.value) return null;
  return currentPage.value.blocks.find(b => b.id === selectedBlockId.value) || null;
});

// --- 页面操作 ---

function addPage() {
  const newId = `page-${Date.now()}`;
  const newPage = {
    id: newId,
    name: `第 ${props.data.pages.length + 1} 页`,
    blocks: [] as { id: string; type: BlockType }[],
  };
  const pages = [...props.data.pages, newPage];
  emit('update:data', { ...props.data, pages });
  currentPageId.value = newId;
  selectedBlockId.value = null;
}

function removePage(pageId: string) {
  if (props.data.pages.length <= 1) return;
  const pages = props.data.pages.filter(p => p.id !== pageId);
  emit('update:data', { ...props.data, pages });
  if (currentPageId.value === pageId) {
    currentPageId.value = pages[0]?.id || '';
  }
  selectedBlockId.value = null;
}

function renamePage(payload: { pageId: string; name: string }) {
  const pages = props.data.pages.map(p =>
    p.id === payload.pageId ? { ...p, name: payload.name } : p
  );
  emit('update:data', { ...props.data, pages });
}

// --- 区块操作 ---

function updatePages(pages: typeof props.data.pages) {
  emit('update:data', { ...props.data, pages });
}

function selectBlock(blockId: string) {
  selectedBlockId.value = blockId;
}

function moveBlockUp(blockId: string) {
  if (!currentPage.value) return;
  const blocks = [...currentPage.value.blocks];
  const idx = blocks.findIndex(b => b.id === blockId);
  if (idx <= 0) return;
  [blocks[idx - 1], blocks[idx]] = [blocks[idx], blocks[idx - 1]];
  const pages = props.data.pages.map(p => (p.id === currentPageId.value ? { ...p, blocks } : p));
  updatePages(pages);
}

function moveBlockDown(blockId: string) {
  if (!currentPage.value) return;
  const blocks = [...currentPage.value.blocks];
  const idx = blocks.findIndex(b => b.id === blockId);
  if (idx < 0 || idx >= blocks.length - 1) return;
  [blocks[idx], blocks[idx + 1]] = [blocks[idx + 1], blocks[idx]];
  const pages = props.data.pages.map(p => (p.id === currentPageId.value ? { ...p, blocks } : p));
  updatePages(pages);
}

function removeBlock(blockId: string) {
  if (!currentPage.value) return;
  const blocks = currentPage.value.blocks.filter(b => b.id !== blockId);
  const pages = props.data.pages.map(p => (p.id === currentPageId.value ? { ...p, blocks } : p));
  updatePages(pages);
  if (selectedBlockId.value === blockId) {
    selectedBlockId.value = null;
  }
}

function addBlock(type: BlockType) {
  if (!currentPage.value) return;
  const newBlock = {
    id: `block-${Date.now()}`,
    type,
  };
  const blocks = [...currentPage.value.blocks, newBlock];
  const pages = props.data.pages.map(p => (p.id === currentPageId.value ? { ...p, blocks } : p));
  updatePages(pages);
  selectedBlockId.value = newBlock.id;
}
</script>

<template>
  <div class="page-editor">
    <!-- 顶部：页面标签 -->
    <PageTabs
      :pages="data.pages"
      :current-page-id="currentPageId"
      @select="
        currentPageId = $event;
        selectedBlockId = null;
      "
      @add="addPage"
      @remove="removePage"
      @rename="renamePage"
    />

    <!-- 中部：区块列表 -->
    <BlockList
      v-if="currentPage"
      :blocks="currentPage.blocks"
      :selected-block-id="selectedBlockId"
      @select="selectBlock"
      @move-up="moveBlockUp"
      @move-down="moveBlockDown"
      @remove="removeBlock"
      @add="addBlock"
    />

    <!-- 底部：属性面板 -->
    <BlockPropertyPanel
      :block="selectedBlock"
      :data="data"
      @update:data="emit('update:data', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-editor {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  background: #fff;
  overflow: hidden;
}

@media print {
  .page-editor {
    display: none !important;
  }
}
</style>
