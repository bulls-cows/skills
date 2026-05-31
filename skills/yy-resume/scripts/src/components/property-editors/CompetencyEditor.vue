<script setup lang="ts">
/**
 * CompetencyEditor - competency 区块属性编辑器
 *
 * 编辑核心竞争力字符串列表
 */
const props = defineProps<{
  blockTitle: string;
  competencies: string[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:competencies', value: string[]): void;
}>();

function addItem() {
  emit('update:competencies', [...props.competencies, '']);
}

function removeItem(index: number) {
  emit(
    'update:competencies',
    props.competencies.filter((_, i) => i !== index)
  );
}

function updateItem(index: number, value: string) {
  const updated = props.competencies.map((item, i) => (i === index ? value : item));
  emit('update:competencies', updated);
}
</script>

<template>
  <div class="editor">
    <h3 class="editor__title">核心能力</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">能力列表</label>
      <div v-for="(item, i) in competencies" :key="'comp-' + i" class="editor__list-item">
        <input
          class="editor__input"
          :value="item"
          @input="updateItem(i, ($event.target as HTMLInputElement).value)"
          placeholder="能力项"
        />
        <button class="editor__btn-remove" @click="removeItem(i)">×</button>
      </div>
      <button class="editor__btn-add" @click="addItem">+ 添加能力项</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './editor-common';
</style>
