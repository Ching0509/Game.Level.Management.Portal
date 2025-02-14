<template>
  <div class="app-container">
    <BaseHeader :navigation-links="navigationLinks" />
    <main class="main-content">
      <ErrorPopup />
      <BaseLoading fullscreen />
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import ErrorPopup from "./components/ErrorPopup.vue";
import BaseLoading from "./components/BaseLoading.vue";
import BaseHeader from "./components/BaseHeader.vue";

const router = useRouter();

const navigationLinks = [
  { name: "Demo", path: "/demo" },
  { name: "Game Level", path: "/game-level" },
];

router.push("/game-level");
</script>

<style>
/* All styles moved to main.css */
.main-content {
  min-height: calc(100dvh - 4rem); /* Adjust based on header height */
  padding-top: 1rem;
}
</style>
