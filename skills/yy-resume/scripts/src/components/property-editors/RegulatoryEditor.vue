<template>
  <div class="editor">
    <h3 class="editor__title">法规体系</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">法规体系分类</label>
      <div v-for="(cat, ci) in regulatorySystems" :key="ci" class="editor__array-item">
        <div class="editor__array-item-header">
          <span class="editor__array-item-index">分类 {{ ci + 1 }}</span>
          <button class="editor__btn-remove" @click="removeCategory(ci)">×</button>
        </div>
        <input
          class="editor__input"
          :value="cat.category"
          @input="updateCategory(ci, ($event.target as HTMLInputElement).value)"
          placeholder="分类名称"
        />
        <div v-for="(item, ii) in cat.items" :key="ii" class="editor__list-item">
          <input
            class="editor__input editor__input--sm"
            :value="item"
            @input="updateItem(ci, ii, ($event.target as HTMLInputElement).value)"
            placeholder="体系项"
          />
          <button class="editor__btn-remove" @click="removeItem(ci, ii)">×</button>
        </div>
        <button class="editor__btn-add" @click="addItem(ci)">+ 添加体系项</button>
      </div>
      <button class="editor__btn-add" @click="addCategory">+ 添加分类</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * RegulatoryEditor - regulatory 区块属性编辑器
 *
 * 编辑法规体系分类列表
 */
import type { SkillCategory } from '@/types/resume';

const props = defineProps<{
  blockTitle: string;
  regulatorySystems: SkillCategory[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:regulatorySystems', value: SkillCategory[]): void;
}>();

function addCategory() {
  emit('update:regulatorySystems', [...props.regulatorySystems, { category: '', items: [''] }]);
}

function removeCategory(index: number) {
  emit(
    'update:regulatorySystems',
    props.regulatorySystems.filter((_, i) => i !== index)
  );
}

function updateCategory(index: number, value: string) {
  const updated = props.regulatorySystems.map((cat, i) =>
    i === index ? { ...cat, category: value } : cat
  );
  emit('update:regulatorySystems', updated);
}

function addItem(catIndex: number) {
  const updated = props.regulatorySystems.map((cat, i) =>
    i === catIndex ? { ...cat, items: [...cat.items, ''] } : cat
  );
  emit('update:regulatorySystems', updated);
}

function removeItem(catIndex: number, itemIndex: number) {
  const updated = props.regulatorySystems.map((cat, i) =>
    i === catIndex ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) } : cat
  );
  emit('update:regulatorySystems', updated);
}

function updateItem(catIndex: number, itemIndex: number, value: string) {
  const updated = props.regulatorySystems.map((cat, i) =>
    i === catIndex
      ? { ...cat, items: cat.items.map((item, j) => (j === itemIndex ? value : item)) }
      : cat
  );
  emit('update:regulatorySystems', updated);
}
</script>

<style lang="scss" scoped>
@use './editor-common';
</style>
