<script setup lang="ts">
/**
 * BlockList - 区块列表管理
 *
 * 显示当前页面中的所有区块，支持排序、删除、添加
 */
import { ref } from 'vue';
import type { BlockConfig, BlockType } from '@/types/resume';

defineProps<{
  blocks: BlockConfig[];
  selectedBlockId: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', blockId: string): void;
  (e: 'move-up', blockId: string): void;
  (e: 'move-down', blockId: string): void;
  (e: 'remove', blockId: string): void;
  (e: 'add', type: BlockType): void;
}>();

const blockTypeLabels: Record<BlockType, string> = {
  header: '头部信息',
  summary: '个人简介',
  skills: '技能',
  competency: '核心能力',
  regulatory: '法规体系',
  experience: '工作经历',
  projects: '项目经验',
  education: '教育背景',
  certs: '证书资质',
  publications: '出版发表',
};

const availableTypes: { type: BlockType; label: string }[] = [
  { type: 'header', label: '头部信息' },
  { type: 'summary', label: '个人简介' },
  { type: 'skills', label: '技能' },
  { type: 'competency', label: '核心能力' },
  { type: 'regulatory', label: '法规体系' },
  { type: 'experience', label: '工作经历' },
  { type: 'projects', label: '项目经验' },
  { type: 'education', label: '教育背景' },
  { type: 'certs', label: '证书资质' },
  { type: 'publications', label: '出版发表' },
];

const showAddMenu = ref(false);
</script>

<template>
  <div class="block-list">
    <div class="block-list__header">
      <span class="block-list__title">区块列表</span>
      <div class="block-list__add-wrapper">
        <button class="block-list__btn-add" @click="showAddMenu = !showAddMenu">+ 添加区块</button>
        <div v-if="showAddMenu" class="block-list__add-menu">
          <button
            v-for="item in availableTypes"
            :key="item.type"
            class="block-list__add-menu-item"
            @click="
              emit('add', item.type);
              showAddMenu = false;
            "
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="block-list__items">
      <div
        v-for="(block, i) in blocks"
        :key="block.id"
        class="block-list__item"
        :class="{ 'block-list__item--selected': block.id === selectedBlockId }"
        @click="emit('select', block.id)"
      >
        <div class="block-list__item-info">
          <span class="block-list__item-type">{{ blockTypeLabels[block.type] || block.type }}</span>
          <span v-if="block.title" class="block-list__item-title">{{ block.title }}</span>
        </div>
        <div class="block-list__item-actions">
          <button
            class="block-list__btn-move"
            :disabled="i === 0"
            @click.stop="emit('move-up', block.id)"
            title="上移"
          >
            ↑
          </button>
          <button
            class="block-list__btn-move"
            :disabled="i === blocks.length - 1"
            @click.stop="emit('move-down', block.id)"
            title="下移"
          >
            ↓
          </button>
          <button
            class="block-list__btn-remove"
            @click.stop="emit('remove', block.id)"
            title="删除"
          >
            ×
          </button>
        </div>
      </div>
      <div v-if="blocks.length === 0" class="block-list__empty">暂无区块，点击上方添加</div>
    </div>
  </div>
</template>

<style scoped>
.block-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.block-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
}

.block-list__title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.block-list__add-wrapper {
  position: relative;
}

.block-list__btn-add {
  padding: 4px 10px;
  font-size: 12px;
  border: 1px dashed #3b82f6;
  border-radius: 4px;
  background: transparent;
  color: #3b82f6;
  cursor: pointer;
  &:hover {
    background: #eff6ff;
  }
}

.block-list__add-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 140px;
  max-height: 240px;
  overflow-y: auto;
}

.block-list__add-menu-item {
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: #374151;
  &:hover {
    background: #f3f4f6;
  }
}

.block-list__items {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.block-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-left: 3px solid transparent;
  &:hover {
    background: #f9fafb;
  }
}

.block-list__item--selected {
  background: #eff6ff;
  border-left-color: #3b82f6;
}

.block-list__item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.block-list__item-type {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
}

.block-list__item-title {
  font-size: 11px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.block-list__item-actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.block-list__btn-move {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover:not(:disabled) {
    background: #e5e7eb;
    color: #374151;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.block-list__btn-remove {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #fef2f2;
  }
}

.block-list__empty {
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
}
</style>
