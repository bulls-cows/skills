<template>
  <div class="page-tabs">
    <div class="page-tabs__list">
      <div
        v-for="page in pages"
        :key="page.id"
        class="page-tabs__tab"
        :class="{ 'page-tabs__tab--active': page.id === currentPageId }"
        @click="emit('select', page.id)"
      >
        <template v-if="editingPageId === page.id">
          <input
            ref="renameInput"
            class="page-tabs__rename-input"
            v-model="editName"
            @blur="finishRename"
            @keydown="handleRenameKeydown"
            @click.stop
          />
        </template>
        <template v-else>
          <span class="page-tabs__tab-name" @dblclick="startRename(page.id, page.name)">{{
            page.name
          }}</span>
        </template>
        <button
          v-if="pages.length > 1"
          class="page-tabs__btn-remove"
          @click.stop="emit('remove', page.id)"
          title="删除页面"
        >
          ×
        </button>
      </div>
      <button class="page-tabs__btn-add" @click="emit('add')" title="添加页面">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * PageTabs - 页面标签管理
 *
 * 显示所有页面的标签，支持切换、增删、重命名
 */
import { ref } from 'vue';
import type { PageConfig } from '@/types/resume';

defineProps<{
  pages: PageConfig[];
  currentPageId: string;
}>();

const emit = defineEmits<{
  (e: 'select', pageId: string): void;
  (e: 'add'): void;
  (e: 'remove', pageId: string): void;
  (e: 'rename', payload: { pageId: string; name: string }): void;
}>();

// 重命名编辑状态
const editingPageId = ref<string | null>(null);
const editName = ref('');

function startRename(pageId: string, currentName: string) {
  editingPageId.value = pageId;
  editName.value = currentName;
}

function finishRename() {
  if (editingPageId.value && editName.value.trim()) {
    emit('rename', { pageId: editingPageId.value, name: editName.value.trim() });
  }
  editingPageId.value = null;
}

function handleRenameKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') finishRename();
  if (e.key === 'Escape') editingPageId.value = null;
}
</script>

<style lang="scss" scoped>
.page-tabs {
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.page-tabs__list {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 8px;
  overflow-x: auto;
}

.page-tabs__tab {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 10px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  user-select: none;
  &:hover {
    color: #374151;
    background: #f9fafb;
  }
}

.page-tabs__tab--active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  font-weight: 500;
}

.page-tabs__tab-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-tabs__rename-input {
  width: 80px;
  padding: 2px 4px;
  font-size: 13px;
  border: 1px solid #3b82f6;
  border-radius: 3px;
  outline: none;
}

.page-tabs__btn-remove {
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover {
    background: #fef2f2;
    color: #ef4444;
  }
}

.page-tabs__btn-add {
  width: 28px;
  height: 28px;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 4px;
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    background: #eff6ff;
  }
}
</style>
