<script setup lang="ts">
defineProps<{
  visible: boolean;
}>();
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="stop-overlay">
      <div class="stop-card">
        <div class="stop-icon">✓</div>
        <div class="stop-title">服务已停止</div>
        <div class="stop-hint">您可安全关闭此页面</div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.stop-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.stop-card {
  background: #fff;
  border-radius: 12px;
  padding: 48px 64px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.stop-icon {
  font-size: 48px;
  color: #22c55e;
  margin-bottom: 16px;
  line-height: 1;
}

.stop-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.stop-hint {
  font-size: 14px;
  color: #6b7280;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
