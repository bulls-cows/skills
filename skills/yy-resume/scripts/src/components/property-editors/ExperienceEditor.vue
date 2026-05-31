<script setup lang="ts">
/**
 * ExperienceEditor - experience 区块属性编辑器
 *
 * 编辑工作经历列表
 */
import type { Experience } from '@/types/resume';

const props = defineProps<{
  blockTitle: string;
  experience: Experience[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:experience', value: Experience[]): void;
}>();

function addItem() {
  emit('update:experience', [
    ...props.experience,
    {
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      descriptions: [],
    },
  ]);
}

function removeItem(index: number) {
  emit(
    'update:experience',
    props.experience.filter((_, i) => i !== index)
  );
}

function updateField(index: number, field: string, value: string) {
  const updated = props.experience.map((exp, i) =>
    i === index ? { ...exp, [field]: value } : exp
  );
  emit('update:experience', updated);
}

function updateTags(index: number, value: string) {
  const tags = value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  const updated = props.experience.map((exp, i) => (i === index ? { ...exp, tags } : exp));
  emit('update:experience', updated);
}

function addDescription(expIndex: number) {
  const updated = props.experience.map((exp, i) =>
    i === expIndex ? { ...exp, descriptions: [...exp.descriptions, ''] } : exp
  );
  emit('update:experience', updated);
}

function removeDescription(expIndex: number, descIndex: number) {
  const updated = props.experience.map((exp, i) =>
    i === expIndex
      ? { ...exp, descriptions: exp.descriptions.filter((_, j) => j !== descIndex) }
      : exp
  );
  emit('update:experience', updated);
}

function updateDescription(expIndex: number, descIndex: number, value: string) {
  const updated = props.experience.map((exp, i) =>
    i === expIndex
      ? { ...exp, descriptions: exp.descriptions.map((d, j) => (j === descIndex ? value : d)) }
      : exp
  );
  emit('update:experience', updated);
}
</script>

<template>
  <div class="editor">
    <h3 class="editor__title">工作经历</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">经历列表</label>
      <div v-for="(exp, i) in experience" :key="'exp-' + i" class="editor__array-item">
        <div class="editor__array-item-header">
          <span class="editor__array-item-index">经历 {{ i + 1 }}</span>
          <button class="editor__btn-remove" @click="removeItem(i)">×</button>
        </div>
        <input
          class="editor__input"
          :value="exp.organization"
          @input="updateField(i, 'organization', ($event.target as HTMLInputElement).value)"
          placeholder="公司名称"
        />
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="exp.url"
            @input="updateField(i, 'url', ($event.target as HTMLInputElement).value)"
            placeholder="公司网址"
          />
        </div>
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="exp.position"
            @input="updateField(i, 'position', ($event.target as HTMLInputElement).value)"
            placeholder="职位"
          />
        </div>
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="exp.startDate"
            @input="updateField(i, 'startDate', ($event.target as HTMLInputElement).value)"
            placeholder="开始日期"
          />
          <input
            class="editor__input"
            :value="exp.endDate"
            @input="updateField(i, 'endDate', ($event.target as HTMLInputElement).value)"
            placeholder="结束日期"
          />
        </div>
        <input
          class="editor__input"
          :value="(exp.tags || []).join(', ')"
          @input="updateTags(i, ($event.target as HTMLInputElement).value)"
          placeholder="标签（逗号分隔）"
        />
        <div class="editor__sub-field editor__sub-field--column">
          <label class="editor__label editor__label--sm">描述</label>
          <div v-for="(desc, di) in exp.descriptions" :key="'desc-' + di" class="editor__list-item">
            <textarea
              class="editor__textarea editor__textarea--sm"
              :value="desc"
              @input="updateDescription(i, di, ($event.target as HTMLTextAreaElement).value)"
              rows="2"
            ></textarea>
            <button class="editor__btn-remove" @click="removeDescription(i, di)">×</button>
          </div>
          <button class="editor__btn-add" @click="addDescription(i)">+ 添加描述</button>
        </div>
      </div>
      <button class="editor__btn-add" @click="addItem">+ 添加经历</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './editor-common';
</style>
