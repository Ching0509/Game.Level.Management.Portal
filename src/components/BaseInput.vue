<template>
  <div class="form-group synthwave-input">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :value="modelValue"
      @input="handleInput"
      @change="handleChange"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash-es";
import { computed } from "vue";

defineOptions({
  name: "BaseInput",
});

const props = defineProps({
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
  error: {
    type: String,
    default: "",
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  debounceTime: {
    type: Number,
    default: 300,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

const emitDebounced = debounce((value: string) => {
  emit('update:modelValue', value);
}, props.debounceTime);

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  
  if (!props.lazy) {
    emitDebounced(value);
  }
};

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  
  if (props.lazy) {
    emit('update:modelValue', value);
  }
};
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
