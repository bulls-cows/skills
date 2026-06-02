<template>
  <div class="editor">
    <h3 class="editor__title">头部信息</h3>
    <div class="editor__field">
      <label class="editor__label">姓名</label>
      <input
        class="editor__input"
        :value="name"
        @input="emit('update:name', ($event.target as HTMLInputElement).value)"
        placeholder="姓名"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">职位</label>
      <input
        class="editor__input"
        :value="title"
        @input="emit('update:title', ($event.target as HTMLInputElement).value)"
        placeholder="职位"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">城市</label>
      <input
        class="editor__input"
        :value="city"
        @input="emit('update:city', ($event.target as HTMLInputElement).value)"
        placeholder="城市"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">手机</label>
      <input
        class="editor__input"
        :value="phone"
        @input="emit('update:phone', ($event.target as HTMLInputElement).value)"
        placeholder="手机"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">邮箱</label>
      <input
        class="editor__input"
        :value="email"
        @input="emit('update:email', ($event.target as HTMLInputElement).value)"
        placeholder="邮箱"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">社交链接</label>
      <div v-for="(link, i) in links" :key="'link-' + i" class="editor__list-item">
        <input
          class="editor__input editor__input--sm"
          :value="link.label"
          @input="updateLink(i, 'label', ($event.target as HTMLInputElement).value)"
          placeholder="名称"
        />
        <input
          class="editor__input editor__input--sm"
          :value="link.url"
          @input="updateLink(i, 'url', ($event.target as HTMLInputElement).value)"
          placeholder="URL"
        />
        <button class="editor__btn-remove" @click="removeLink(i)">×</button>
      </div>
      <button class="editor__btn-add" @click="addLink">+ 添加链接</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * HeaderEditor - header 区块属性编辑器
 *
 * 编辑简历头部信息：姓名、职位、城市、手机、邮箱、社交链接
 */
import type { Link } from '@/types/resume';

const props = defineProps<{
  name: string;
  title: string;
  city: string;
  phone: string;
  email: string;
  links: Link[];
}>();

const emit = defineEmits<{
  (e: 'update:name', value: string): void;
  (e: 'update:title', value: string): void;
  (e: 'update:city', value: string): void;
  (e: 'update:phone', value: string): void;
  (e: 'update:email', value: string): void;
  (e: 'update:links', value: Link[]): void;
}>();

function addLink() {
  emit('update:links', [...props.links, { label: '', url: '' }]);
}

function removeLink(index: number) {
  const updated = props.links.filter((_, i) => i !== index);
  emit('update:links', updated);
}

function updateLink(index: number, field: 'label' | 'url', value: string) {
  const updated = props.links.map((link, i) => (i === index ? { ...link, [field]: value } : link));
  emit('update:links', updated);
}
</script>

<style lang="scss" scoped>
@use './editor-common';
</style>
