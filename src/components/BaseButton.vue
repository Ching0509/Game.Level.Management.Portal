<template>
  <button
    :class="[
      'btn',
      'synthwave-btn',
      variant ? `btn-${variant}` : 'btn-primary',
      size ? `btn-${size}` : '',
      { 'w-100': block }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseButton'
})

defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: ''
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.synthwave-btn {
  position: relative;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  background-size: 200% auto;
  color: white;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.synthwave-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  padding: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.btn-primary {
  background-image: linear-gradient(
    45deg,
    #ff00ff 0%,
    #00ffff 50%,
    #ff00ff 100%
  );
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5),
              0 0 40px rgba(0, 255, 255, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.7),
              0 0 50px rgba(0, 255, 255, 0.4);
}

.btn-secondary {
  background-image: linear-gradient(
    45deg,
    #fc466b 0%,
    #3f5efb 50%,
    #fc466b 100%
  );
  box-shadow: 0 0 20px rgba(252, 70, 107, 0.5),
              0 0 40px rgba(63, 94, 251, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(252, 70, 107, 0.7),
              0 0 50px rgba(63, 94, 251, 0.4);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.25rem;
}

.w-100 {
  width: 100%;
}

.synthwave-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image: linear-gradient(45deg, #666, #999);
  box-shadow: none;
  transform: none;
}

.synthwave-btn:disabled::before {
  background: linear-gradient(90deg, #666, #999);
  opacity: 0.5;
}

/* Active state */
.synthwave-btn:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.4),
              0 0 30px rgba(0, 255, 255, 0.2);
}

/* Focus state */
.synthwave-btn:focus {
  outline: none;
}

/* Transition for background position */
.synthwave-btn {
  background-position: left center;
  transition: all 0.3s ease,
              background-position 0.5s ease-in-out;
}

@media (max-width: 768px) {
  .synthwave-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .btn-sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .btn-lg {
    padding: 0.8rem 1.6rem;
    font-size: 1.1rem;
  }
}
</style>
