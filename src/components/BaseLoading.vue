<template>
  <div v-if="loadingStore.isLoading">
    <div v-if="fullscreen" class="loading-overlay">
      <div class="loading-container">
        <div class="spinner-border text-neon" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="loading-text">Loading...</div>
      </div>
    </div>
    <div v-else class="loading-container">
      <div class="spinner-border text-neon" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="loading-text">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loadingStore";

defineOptions({
  name: "BaseLoading",
});

defineProps({
  fullscreen: {
    type: Boolean,
    default: false,
  },
});

const loadingStore = useLoadingStore();
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 1rem;
}

.spinner-border {
  width: 4rem;
  height: 4rem;
  border: 0.25rem solid var(--primary-color);
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.text-neon {
  color: var(--primary-color);
  filter: drop-shadow(0 0 10px var(--primary-color))
    drop-shadow(0 0 20px var(--primary-color));
}

.loading-text {
  font-size: 1.5rem;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    text-shadow: 0 0 10px var(--secondary-color), 0 0 20px var(--secondary-color);
  }
  50% {
    opacity: 0.5;
    text-shadow: 0 0 5px var(--secondary-color);
  }
}

@media (max-width: 768px) {
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }

  .loading-text {
    font-size: 1.25rem;
  }
}
</style>
