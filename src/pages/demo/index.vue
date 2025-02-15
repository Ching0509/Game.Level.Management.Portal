<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">Component Demo Page</h1>

    <!-- Buttons Section -->
    <section class="mb-5">
      <h2 class="mb-4">Buttons</h2>
      <div class="grid">
        <div class="col-span-4">
          <h3 class="mb-3">Primary Buttons</h3>
          <div class="flex gap-3 mb-3">
            <BaseButton>Default</BaseButton>
            <BaseButton size="sm">Small</BaseButton>
            <BaseButton size="lg">Large</BaseButton>
            <BaseButton disabled>Disabled</BaseButton>
          </div>
          <BaseButton block>Block Button</BaseButton>
        </div>
        <div class="col-span-4">
          <h3 class="mb-3">Secondary Buttons</h3>
          <div class="flex gap-3 mb-3">
            <BaseButton variant="secondary">Default</BaseButton>
            <BaseButton variant="secondary" size="sm">Small</BaseButton>
            <BaseButton variant="secondary" size="lg">Large</BaseButton>
            <BaseButton variant="secondary" disabled>Disabled</BaseButton>
          </div>
          <BaseButton variant="secondary" block>Block Button</BaseButton>
        </div>
      </div>
    </section>

    <!-- Text Inputs Section -->
    <section class="mb-5">
      <h2 class="mb-4">Text Inputs</h2>
      <div class="grid">
        <div class="col-span-4">
          <BaseInput
            v-model="inputValue1"
            label="Default Input"
            placeholder="Enter some text"
          />
          <BaseInput
            v-model="inputValue2"
            label="Required Input"
            placeholder="This field is required"
            required
          />
        </div>
        <div class="col-span-4">
          <BaseInput
            v-model="inputValue3"
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />
          <BaseInput
            v-model="inputValue4"
            label="Input with Error"
            placeholder="This input has an error"
            error="This field has an error message"
          />
        </div>
      </div>
    </section>

    <!-- Loading Component -->
    <section class="mb-5">
      <h2 class="mb-4">Loading States</h2>
      <h3 class="mb-3">Global Loading Overlay</h3>
      <BaseButton @click="toggleLoading">Show Global Loading (2s)</BaseButton>
    </section>

    <!-- Modal Demo -->
    <section class="mb-5">
      <h2 class="mb-4">Modals</h2>
      <div class="grid">
        <div class="col-span-4">
          <BaseButton @click="showModal = true">Open Modal</BaseButton>
          <BaseModal v-model="showModal" title="Demo Modal">
            <p>This is a demo modal with some content.</p>
            <p>You can put any content here.</p>
            <template #footer>
              <BaseButton variant="secondary" @click="showModal = false"
                >Close</BaseButton
              >
              <BaseButton @click="showModal = false">Save Changes</BaseButton>
            </template>
          </BaseModal>
        </div>
        <div class="col-span-4">
          <BaseButton variant="secondary" @click="triggerError">
            Show Error Popup
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useErrorMsgStore } from "@/stores/errorMsgStore";
import { useLoadingStore } from "@/stores/loadingStore";

defineOptions({
  name: "DemoPage",
});

const errorStore = useErrorMsgStore();
const loadingStore = useLoadingStore();

// Input values
const inputValue1 = ref("");
const inputValue2 = ref("");
const inputValue3 = ref("");
const inputValue4 = ref("");

// Modal state
const showModal = ref(false);

// Error popup demo
const triggerError = () => {
  errorStore.showError("This is a demo error message!");
};

// Add new function for loading demo
const toggleLoading = async () => {
  loadingStore.showLoading();
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2s loading
  loadingStore.hideLoading();
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

h1,
h2,
h3 {
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 15px var(--primary-color);
}

h1 {
  font-size: 3rem;
  margin-bottom: 4rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  font-size: 2.25rem;
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: 0.75rem;
  margin-bottom: 2.5rem;
}

h3 {
  font-size: 1.75rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
}

section {
  margin-bottom: 5rem;
  padding: 2.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 2px solid rgba(255, 0, 255, 0.2);
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.15), inset 0 0 20px rgba(255, 0, 255, 0.1);
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2rem;
}

.gap-3 {
  gap: 1.5rem;
}

.flex {
  display: flex;
  align-items: center;
}

.col-span-4 {
  grid-column: span 4;
}

@media (max-width: 1024px) {
  .container {
    padding: 2rem 1.5rem;
  }

  .grid {
    gap: 1.5rem;
  }

  section {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem 1rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .col-span-4 {
    grid-column: span 1;
  }

  .flex {
    flex-direction: column;
  }

  .gap-3 {
    gap: 1rem;
  }

  section {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.25rem;
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem 0.75rem;
  }

  section {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }
}
</style>
