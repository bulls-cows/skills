<template>
  <div class="app">
    <AppShell :layout="layout">
      <RouterView />
    </AppShell>
    <GlobalLoading />
    <GlobalAlert
      :visible="isAlertVisible"
      :title="alertTitle"
      :message="alertMessage"
      @close="closeAlert"
      @confirm="confirmAlert"
    />
    <GlobalToast
      :visible="isToastVisible"
      :title="toastTitle"
      :message="toastMessage"
      :type="toastType"
      @close="hideToast"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import AppShell from "@src/components/AppShell/AppShell.vue";
import GlobalAlert from "@src/components/GlobalAlert/GlobalAlert.vue";
import GlobalLoading from "@src/components/GlobalLoading/GlobalLoading.vue";
import GlobalToast from "@src/components/GlobalToast/GlobalToast.vue";
import { useGlobalAlert } from "@src/composables/useGlobalAlert";
import { useGlobalToast } from "@src/composables/useGlobalToast";

const route = useRoute();
const layout = computed(() => route.meta.layout ?? "default");
const { isAlertVisible, alertTitle, alertMessage, confirmAlert, closeAlert } = useGlobalAlert();
const { isToastVisible, toastTitle, toastMessage, toastType, hideToast } = useGlobalToast();
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
</style>
