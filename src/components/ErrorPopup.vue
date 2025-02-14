<template>
  <BaseModal v-model="isVisible" title="Error" class="error-popup">
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <p class="error-message">{{ errorStore.errorMsg }}</p>
    </div>
    <template #footer>
      <BaseButton variant="secondary" @click="handleClose"> Close </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useErrorMsgStore } from "@/stores/errorMsgStore";
import BaseModal from "./BaseModal.vue";
import BaseButton from "./BaseButton.vue";

defineOptions({
  name: "ErrorPopup",
});

const errorStore = useErrorMsgStore();

const isVisible = computed({
  get: () => errorStore.isShowed,
  set: (value: boolean) => {
    if (!value) {
      handleClose();
    }
  },
});

const handleClose = () => {
  errorStore.hideError();
};
</script>

<style scoped>
.error-popup :deep(.modal-container) {
  border-color: #ff0044;
  box-shadow: 0 0 25px rgba(255, 0, 68, 0.4), 0 0 45px rgba(255, 0, 68, 0.2);
}

.error-content {
  text-align: center;
  padding: 1rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.error-message {
  font-size: 1.1rem;
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 0, 68, 0.6);
  margin: 0;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .error-content {
    padding: 0.5rem;
  }

  .error-icon {
    font-size: 2.5rem;
  }

  .error-message {
    font-size: 1rem;
  }
}
</style>
