<template>
  <div class="editor">
    <h3 class="editor__title">教育背景</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">教育经历</label>
      <div v-for="(edu, i) in education" :key="'edu-' + i" class="editor__array-item">
        <div class="editor__array-item-header">
          <span class="editor__array-item-index">经历 {{ i + 1 }}</span>
          <button class="editor__btn-remove" @click="removeItem(i)">×</button>
        </div>
        <input
          class="editor__input"
          :value="edu.school"
          @input="updateField(i, 'school', ($event.target as HTMLInputElement).value)"
          placeholder="学校"
        />
        <input
          class="editor__input"
          :value="edu.major"
          @input="updateField(i, 'major', ($event.target as HTMLInputElement).value)"
          placeholder="专业"
        />
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="edu.startDate"
            @input="updateField(i, 'startDate', ($event.target as HTMLInputElement).value)"
            placeholder="开始日期"
          />
          <input
            class="editor__input"
            :value="edu.endDate"
            @input="updateField(i, 'endDate', ($event.target as HTMLInputElement).value)"
            placeholder="结束日期"
          />
        </div>
      </div>
      <button class="editor__btn-add" @click="addItem">+ 添加教育经历</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EducationEditor - education 区块属性编辑器
 *
 * 编辑教育背景列表
 */

const props = defineProps<{
  blockTitle: string;
  education: Education[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:education', value: Education[]): void;
}>();

function addItem() {
  emit('update:education', [
    ...props.education,
    { school: '', major: '', startDate: '', endDate: '' },
  ]);
}

function removeItem(index: number) {
  emit(
    'update:education',
    props.education.filter((_, i) => i !== index)
  );
}

function updateField(index: number, field: string, value: string) {
  const updated = props.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu));
  emit('update:education', updated);
}
</script>

<style lang="scss" scoped>
@use './editor-common';
</style>
