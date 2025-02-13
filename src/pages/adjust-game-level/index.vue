<template>
  <div class="container">
    <div class="page-header">
      <h1>{{ isEditing ? "Edit Level" : "Create New Level" }}</h1>
    </div>

    <div class="form-container">
      <div class="form-group">
        <label for="levelName" class="form-label">Level Name</label>
        <BaseInput
          id="levelName"
          v-model="levelName"
          placeholder="Enter level name"
          :error="nameError"
          required
        />
      </div>

      <div class="block-section">
        <h2>Place Blocks</h2>
        <p class="block-instructions">
          Click on any cell to add a block, click on a block to remove it.
        </p>

        <BlockSelector
          :blocks="currentBlocks"
          @add-block="handleAddBlock"
          @remove-block="handleRemoveBlock"
        />
      </div>

      <div class="form-actions">
        <BaseButton variant="secondary" @click="handleCancel"> Cancel </BaseButton>
        <BaseButton :disabled="!isValid" @click="handleSave">
          {{ isEditing ? "Save Changes" : "Create Level" }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGameLevelStore } from "@/stores/gameLevelStore";
import type { Block } from "@/stores/gameLevelStore";
import BlockSelector from "@/components/BlockSelector.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

defineOptions({
  name: "AdjustGameLevelPage",
});

const route = useRoute();
const router = useRouter();
const gameLevelStore = useGameLevelStore();

const levelId = computed(() => {
  const id = route.params.id;
  return id ? parseInt(id as string) : null;
});

const isEditing = computed(() => levelId.value !== null);

const levelName = ref("");
const currentBlocks = ref<Block[]>([]);
const nameError = ref("");

const isValid = computed(() => {
  return levelName.value.trim().length > 0;
});

onMounted(async () => {
  if (levelId.value) {
    try {
      const level = await gameLevelStore.loadLevel(levelId.value);
      if (level) {
        levelName.value = level.name;
        currentBlocks.value = [...level.blocks];
      } else {
        nameError.value = "Level not found";
        router.push({ name: "game-level" });
      }
    } catch (error) {
      console.error("Failed to load level:", error);
      nameError.value = "Failed to load level";
      router.push({ name: "game-level" });
    }
  }
});

const handleAddBlock = (x: number, y: number) => {
  currentBlocks.value.push({
    x,
    y,
  });
};

const handleRemoveBlock = (blockId: number) => {
  currentBlocks.value = currentBlocks.value.filter((b) => b.id !== blockId);
};

const handleSave = async () => {
  if (!isValid.value) return;

  try {
    if (isEditing.value && levelId.value) {
      const updated = await gameLevelStore.updateLevel(levelId.value, {
        name: levelName.value,
        blocks: currentBlocks.value,
      });
      if (!updated) {
        nameError.value = "Failed to update level";
        return;
      }
    } else {
      await gameLevelStore.createLevel(levelName.value, currentBlocks.value);
    }
    router.push({ name: "game-level" });
  } catch (error) {
    console.error("Failed to save level:", error);
    nameError.value = "Failed to save level";
  }
};

const handleCancel = () => {
  router.push({ name: "game-level" });
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px var(--primary-color);
}

.form-container {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.block-section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.block-instructions {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.75rem;
  }

  .form-container {
    padding: 1rem;
  }

  h1 {
    font-size: 1.75rem;
  }
}
</style>
