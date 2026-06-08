<template>
  <div class="main-page-layout">
    <header v-if="hasHeader" class="main-page-layout__header">
      <div v-if="hasHeaderTop" class="main-page-layout__row">
        <div class="main-page-layout__title-area">
          <h1 v-if="title" class="main-page-layout__title">{{ title }}</h1>
          <div v-else class="main-page-layout__title-placeholder"></div>
          <slot v-if="$slots.titleAccent" name="titleAccent" />
        </div>

        <div v-if="$slots.headerRightTop" class="main-page-layout__right">
          <slot name="headerRightTop" />
        </div>
      </div>

      <div
        v-if="hasHeaderMiddle"
        class="main-page-layout__row main-page-layout__row--middle"
        :class="{ 'main-page-layout__row--with-top': hasHeaderTop }"
      >
        <div class="main-page-layout__middle-left">
          <button
            v-if="showBack"
            class="main-page-layout__back"
            type="button"
            :aria-label="backText"
            @click="emit('back')"
          >
            <span class="main-page-layout__back-icon" aria-hidden="true">←</span>
            <span>{{ backText }}</span>
          </button>

          <h2 v-if="subTitle" class="main-page-layout__subtitle">
            {{ subTitle }}
          </h2>
        </div>

        <div v-if="$slots.headerRightMiddle" class="main-page-layout__right">
          <slot name="headerRightMiddle" />
        </div>
      </div>

      <div
        v-if="hasHeaderBottom"
        class="main-page-layout__row"
        :class="{
          'main-page-layout__row--with-top': hasHeaderTop || hasHeaderMiddle,
        }"
      >
        <p v-if="description" class="main-page-layout__description">
          {{ description }}
        </p>
        <div v-else class="main-page-layout__description-placeholder"></div>

        <div v-if="$slots.headerRightBottom" class="main-page-layout__right">
          <slot name="headerRightBottom" />
        </div>
      </div>
    </header>

    <section class="main-page-layout__content">
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    subTitle?: string;
    backText?: string;
    showBack?: boolean;
  }>(),
  {
    title: "",
    description: "",
    subTitle: "",
    backText: "返回",
    showBack: false,
  },
);

const emit = defineEmits<{
  back: [];
}>();

const slots = useSlots();

const hasHeaderTop = computed(
  () => Boolean(props.title) || Boolean(slots.titleAccent) || Boolean(slots.headerRightTop),
);

const hasHeaderMiddle = computed(
  () => props.showBack || Boolean(props.subTitle) || Boolean(slots.headerRightMiddle),
);

const hasHeaderBottom = computed(
  () => Boolean(props.description) || Boolean(slots.headerRightBottom),
);

const hasHeader = computed(
  () => hasHeaderTop.value || hasHeaderMiddle.value || hasHeaderBottom.value,
);
</script>

<style scoped lang="scss">
.main-page-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: var(--space-24);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.92), transparent 30%),
    radial-gradient(circle at bottom left, rgba(210, 228, 255, 0.36), transparent 32%),
    linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%);
  box-shadow: var(--shadow-panel);

  &__header {
    display: grid;
    gap: var(--space-12);
  }

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-24);

    &--middle {
      align-items: center;
    }

    &--with-top {
      margin-top: var(--space-4);
    }
  }

  &__title-area,
  &__middle-left,
  &__title-placeholder,
  &__description-placeholder {
    min-width: 0;
  }

  &__title-area,
  &__middle-left {
    flex: 1;
  }

  &__title {
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-headline);
    font-size: 0.34rem;
    line-height: 1.1;
  }

  &__middle-left {
    display: flex;
    align-items: center;
    gap: var(--space-12);
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-4);
    flex: 0 0 auto;
    min-height: 0.36rem;
    padding: 0 var(--space-12);
    border-radius: var(--radius-md);
    color: var(--color-primary);
    font-weight: 800;
    background: var(--color-primary-soft);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-0.01rem);
      box-shadow: var(--shadow-panel);
    }
  }

  &__back-icon {
    font-size: 0.16rem;
    line-height: 1;
  }

  &__subtitle {
    overflow: hidden;
    margin: 0;
    color: var(--color-text);
    font-size: 0.2rem;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__description {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.14rem;
    font-weight: 600;
  }

  &__right {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-12);
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    margin-top: var(--space-20);
    overflow: auto;

    > * {
      width: 100%;
    }
  }
}

@media (max-width: 720px) {
  .main-page-layout {
    padding: var(--space-20);

    &__row,
    &__middle-left,
    &__right {
      align-items: flex-start;
      flex-direction: column;
    }

    &__title {
      font-size: 0.28rem;
    }
  }
}
</style>
