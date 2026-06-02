<template>
  <section class="home-view">
    <h1 class="home-view__title">Home</h1>
    <p class="home-view__description">Welcome to the application.</p>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-view {
  padding: 0.24rem;

  &__title {
    font-size: 0.24rem;
    font-weight: 700;
  }

  &__description {
    margin-top: 0.08rem;
    color: var(--color-text-muted);
  }
}
</style>
