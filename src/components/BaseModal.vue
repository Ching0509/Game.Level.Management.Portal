<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="model" class="modal-wrapper">
        <div class="modal-backdrop" @click="model = false"></div>
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button class="close-button" @click="model = false">×</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseModal'
})

const model = defineModel<boolean>({ required: true })

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: 500px;
  background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
  border: 2px solid #ff00ff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3),
              0 0 40px rgba(0, 255, 255, 0.2);
  z-index: 1051;
}

.modal-header {
  padding: 1rem;
  border-bottom: 2px solid rgba(255, 0, 255, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.close-button {
  background: none;
  border: none;
  color: #ff00ff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.close-button:hover {
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
  transform: scale(1.1);
}

.modal-body {
  padding: 1rem;
  color: #fff;
}

.modal-footer {
  padding: 1rem;
  border-top: 2px solid rgba(255, 0, 255, 0.3);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 767px) {
  .modal-container {
    width: 95%;
    margin: 1rem;
  }
}
</style>
