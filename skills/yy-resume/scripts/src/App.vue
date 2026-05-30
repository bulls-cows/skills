<script setup lang="ts">
import ResumeEditor from './components/ResumeEditor.vue';
</script>

<template>
  <ResumeEditor />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f0f2f5;
  height: 100vh;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media print {
  .app {
    display: block;
    height: auto;
  }

  body {
    overflow: visible;
    height: auto;
  }
}
</style>
