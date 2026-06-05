<template>
  <div class="editor">
    <h3 class="editor__title">证书资质</h3>
    <div class="editor__field">
      <label class="editor__label">区块标题</label>
      <input
        class="editor__input"
        :value="blockTitle"
        @input="emit('update:blockTitle', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="editor__field">
      <label class="editor__label">证书列表</label>
      <div v-for="(cert, i) in certs" :key="'cert-' + i" class="editor__array-item">
        <div class="editor__array-item-header">
          <span class="editor__array-item-index">证书 {{ i + 1 }}</span>
          <button class="editor__btn-remove" @click="removeItem(i)">×</button>
        </div>
        <input
          class="editor__input"
          :value="cert.name"
          @input="updateField(i, 'name', ($event.target as HTMLInputElement).value)"
          placeholder="证书名称"
        />
        <input
          class="editor__input"
          :value="cert.issuer"
          @input="updateField(i, 'issuer', ($event.target as HTMLInputElement).value)"
          placeholder="颁发机构"
        />
        <input
          class="editor__input"
          :value="cert.year"
          @input="updateField(i, 'year', ($event.target as HTMLInputElement).value)"
          placeholder="年份"
          style="width: 120px"
        />
      </div>
      <button class="editor__btn-add" @click="addItem">+ 添加证书</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CertsEditor - certs 区块属性编辑器
 *
 * 编辑证书列表
 */

const props = defineProps<{
  blockTitle: string;
  certs: Cert[];
}>();

const emit = defineEmits<{
  (e: 'update:blockTitle', value: string): void;
  (e: 'update:certs', value: Cert[]): void;
}>();

function addItem() {
  emit('update:certs', [...props.certs, { name: '', issuer: '', year: '' }]);
}

function removeItem(index: number) {
  emit(
    'update:certs',
    props.certs.filter((_, i) => i !== index)
  );
}

function updateField(index: number, field: string, value: string) {
  const updated = props.certs.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert));
  emit('update:certs', updated);
}
</script>

<style lang="scss" scoped>
@use './editor-common';
</style>
