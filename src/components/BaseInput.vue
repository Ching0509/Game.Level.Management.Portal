<template>
  <div class="form-group synthwave-input">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :value="model"
      @input="model = ($event.target as HTMLInputElement).value"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
    />
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "BaseInput",
});

const model = defineModel<string>();

defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style scoped>
.synthwave-input {
  margin-bottom: 1.5rem;
}

.form-label {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.form-control {
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid #ff00ff;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
  border-color: #00ffff;
  background: rgba(0, 0, 0, 0.3);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.error-message {
  color: #ff00ff;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
}

.form-control:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  border-color: #666;
}
</style>
