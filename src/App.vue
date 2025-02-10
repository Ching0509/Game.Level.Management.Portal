<template>
  <div class="app-container">
    <BaseHeader />
    <main class="main-content">
      <ErrorPopup />
      <BaseLoading v-if="loadingStore.isLoading" fullscreen />
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import ErrorPopup from "./components/ErrorPopup.vue";
import BaseLoading from "./components/BaseLoading.vue";
import BaseHeader from "./components/BaseHeader.vue";
import { useLoadingStore } from "./stores/loadingStore";

const router = useRouter();
const loadingStore = useLoadingStore();

router.push("/demo");
</script>

<style>
/* All styles moved to main.css */
.main-content {
  min-height: calc(100vh - 4rem); /* Adjust based on header height */
  padding-top: 1rem;
}
</style>
