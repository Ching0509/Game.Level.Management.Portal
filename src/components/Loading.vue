<template>
  <div class="loading-container">
    <div class="spinner-border text-neon" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="loading-text">Loading...</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseLoading'
})
</script>

<style scoped>
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
</style>
