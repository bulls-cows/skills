<template>
  <!-- 淡入淡出过渡动画 -->
  <Transition name="fade">
    <!-- 全屏遮罩层 -->
    <div v-if="visible" class="stop-overlay">
      <!-- 停止提示卡片 -->
      <div class="stop-overlay__card">
        <!-- 成功图标 -->
        <div class="stop-overlay__icon">✓</div>
        <!-- 停止标题 -->
        <div class="stop-overlay__title">服务已停止</div>
        <!-- 操作提示 -->
        <div class="stop-overlay__hint">您可安全关闭此页面</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * StopOverlay - 服务停止遮罩层
 *
 * 【职责】
 * 服务停止时显示全屏遮罩，阻止用户继续操作
 *
 * 【数据流向】
 * - 接收: visible (boolean 控制显示/隐藏)
 *
 * 【交互关系】
 * - 由父组件控制 visible 属性
 * - 使用 Vue Transition 实现淡入淡出动画
 *
 * 【核心流程】
 * visible=true → 显示遮罩层 + 停止提示卡片 → visible=false → 淡出隐藏
 */

// Props: 控制遮罩层显示状态
defineProps<{
  visible: boolean;
}>();
</script>

<style lang="scss" scoped>
/* 全屏遮罩层 */
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

/* 停止提示卡片 */
.stop-overlay__card {
  background: #fff;
  border-radius: 12px;
  padding: 48px 64px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* 成功图标 */
.stop-overlay__icon {
  font-size: 48px;
  color: #22c55e;
  margin-bottom: 16px;
  line-height: 1;
}

/* 停止标题 */
.stop-overlay__title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

/* 操作提示 */
.stop-overlay__hint {
  font-size: 14px;
  color: #6b7280;
}

/* 淡入淡出过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
