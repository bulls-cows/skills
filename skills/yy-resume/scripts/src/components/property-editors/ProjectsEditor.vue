<template>
  <div class="editor">
    <h3 class="editor__title">项目经验</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">变体类型</label>
      <select
        class="editor__select"
        :value="variant"
        @change="emit('update:variant', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">无</option>
        <option value="tech">技术栈（tech）</option>
        <option value="submission">申报类型（submission）</option>
        <option value="tools">工具与方法（tools）</option>
      </select>
    </div>
    <div class="editor__field">
      <label class="editor__label">项目列表</label>
      <div v-for="(proj, i) in projects" :key="'proj-' + i" class="editor__array-item">
        <div class="editor__array-item-header">
          <span class="editor__array-item-index">项目 {{ i + 1 }}</span>
          <button class="editor__btn-remove" @click="removeItem(i)">×</button>
        </div>
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="proj.name"
            @input="updateField(i, 'name', ($event.target as HTMLInputElement).value)"
            placeholder="项目名称"
          />
        </div>
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="proj.url"
            @input="updateField(i, 'url', ($event.target as HTMLInputElement).value)"
            placeholder="项目网址"
          />
        </div>
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="proj.role"
            @input="updateField(i, 'role', ($event.target as HTMLInputElement).value)"
            placeholder="角色"
          />
        </div>
        <div class="editor__sub-field">
          <input
            class="editor__input"
            :value="proj.startDate"
            @input="updateField(i, 'startDate', ($event.target as HTMLInputElement).value)"
            placeholder="开始日期"
          />
          <input
            class="editor__input"
            :value="proj.endDate"
            @input="updateField(i, 'endDate', ($event.target as HTMLInputElement).value)"
            placeholder="结束日期"
          />
        </div>
        <template v-if="variant === 'tech'">
          <input
            class="editor__input"
            :value="proj.techStack || ''"
            @input="updateField(i, 'techStack', ($event.target as HTMLInputElement).value)"
            placeholder="技术栈"
          />
        </template>
        <template v-if="variant === 'submission'">
          <input
            class="editor__input"
            :value="proj.submissionType || ''"
            @input="updateField(i, 'submissionType', ($event.target as HTMLInputElement).value)"
            placeholder="申报类型"
          />
        </template>
        <template v-if="variant === 'tools'">
          <input
            class="editor__input"
            :value="proj.toolsMethods || ''"
            @input="updateField(i, 'toolsMethods', ($event.target as HTMLInputElement).value)"
            placeholder="工具与方法"
          />
        </template>
        <div class="editor__sub-field editor__sub-field--column">
          <label class="editor__label editor__label--sm">描述</label>
          <div
            v-for="(desc, di) in proj.descriptions"
            :key="'desc-' + di"
            class="editor__list-item"
          >
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
      <button class="editor__btn-add" @click="addItem">+ 添加项目</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ProjectsEditor - projects 区块属性编辑器
 *
 * 编辑项目经验列表，含 variant 选择
 */

const props = defineProps<{
  blockTitle: string;
  variant: string;
  projects: Project[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:variant', value: string): void;
  (e: 'update:projects', value: Project[]): void;
}>();

function addItem() {
  emit('update:projects', [
    ...props.projects,
    {
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      descriptions: [],
    },
  ]);
}

function removeItem(index: number) {
  emit(
    'update:projects',
    props.projects.filter((_, i) => i !== index)
  );
}

function updateField(index: number, field: string, value: string) {
  const updated = props.projects.map((proj, i) =>
    i === index ? { ...proj, [field]: value } : proj
  );
  emit('update:projects', updated);
}

function addDescription(projIndex: number) {
  const updated = props.projects.map((proj, i) =>
    i === projIndex ? { ...proj, descriptions: [...proj.descriptions, ''] } : proj
  );
  emit('update:projects', updated);
}

function removeDescription(projIndex: number, descIndex: number) {
  const updated = props.projects.map((proj, i) =>
    i === projIndex
      ? { ...proj, descriptions: proj.descriptions.filter((_, j) => j !== descIndex) }
      : proj
  );
  emit('update:projects', updated);
}

function updateDescription(projIndex: number, descIndex: number, value: string) {
  const updated = props.projects.map((proj, i) =>
    i === projIndex
      ? { ...proj, descriptions: proj.descriptions.map((d, j) => (j === descIndex ? value : d)) }
      : proj
  );
  emit('update:projects', updated);
}
</script>

<style lang="scss" scoped>
@use './editor-common';
</style>
