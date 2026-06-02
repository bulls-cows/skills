<template>
  <div class="editor">
    <h3 class="editor__title">出版发表</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">论文列表</label>
      <div v-for="(pub, i) in publications" :key="'pub-' + i" class="editor__array-item">
        <div class="editor__array-item-header">
          <span class="editor__array-item-index">论文 {{ i + 1 }}</span>
          <button class="editor__btn-remove" @click="removeItem(i)">×</button>
        </div>
        <input
          class="editor__input"
          :value="pub.title"
          @input="updateField(i, 'title', ($event.target as HTMLInputElement).value)"
          placeholder="论文标题"
        />
        <input
          class="editor__input"
          :value="pub.journal"
          @input="updateField(i, 'journal', ($event.target as HTMLInputElement).value)"
          placeholder="期刊"
        />
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="pub.year"
            @input="updateField(i, 'year', ($event.target as HTMLInputElement).value)"
            placeholder="年份"
            style="width: 100px"
          />
          <input
            class="editor__input"
            :value="pub.authors"
            @input="updateField(i, 'authors', ($event.target as HTMLInputElement).value)"
            placeholder="作者"
          />
        </div>
      </div>
      <button class="editor__btn-add" @click="addItem">+ 添加论文</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * PublicationsEditor - publications 区块属性编辑器
 *
 * 编辑出版物列表
 */
import type { Publication } from '@/types/resume';

const props = defineProps<{
  blockTitle: string;
  publications: Publication[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:publications', value: Publication[]): void;
}>();

function addItem() {
  emit('update:publications', [
    ...props.publications,
    { title: '', journal: '', year: '', authors: '' },
  ]);
}

function removeItem(index: number) {
  emit(
    'update:publications',
    props.publications.filter((_, i) => i !== index)
  );
}

function updateField(index: number, field: string, value: string) {
  const updated = props.publications.map((pub, i) =>
    i === index ? { ...pub, [field]: value } : pub
  );
  emit('update:publications', updated);
}
</script>

<style lang="scss" scoped>
@use './editor-common';
</style>
