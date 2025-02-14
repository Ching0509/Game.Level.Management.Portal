<template>
  <div class="container">
    <div class="page-header">
      <h1>Game Levels</h1>
      <BaseButton @click="handleAddNew">Add New Level</BaseButton>
    </div>

    <LevelTable :items="levels" :key="levels.length">
      <template #actions="{ item }">
        <div class="actions-wrapper">
          <BaseButton size="sm" @click="handleEdit(item)"> Edit </BaseButton>
          <BaseButton variant="secondary" size="sm" @click="() => openDeleteModal(item)">
            Delete
          </BaseButton>
        </div>
      </template>
      <template #empty>
        <div class="empty-state">
          <p>No game levels found</p>
          <BaseButton @click="handleAddNew">Create First Level</BaseButton>
        </div>
      </template>
    </LevelTable>

    <!-- Delete Confirmation Modal -->
    <BaseModal v-model="showDeleteModal" title="Confirm Delete">
      <div class="delete-confirmation">
        <p>Are you sure you want to delete "{{ levelToDelete?.name }}"?</p>
        <p class="delete-warning">This action cannot be undone.</p>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="showDeleteModal = false">
          Cancel
        </BaseButton>
        <BaseButton @click="confirmDelete"> Delete </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameLevelStore } from '@/stores/gameLevelStore'
import LevelTable, { type TableItem } from './components/LevelTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

defineOptions({
  name: 'GameLevelPage'
})

const router = useRouter()
const gameLevelStore = useGameLevelStore()
const levels = computed(() => gameLevelStore.levels)

// Delete modal state
const showDeleteModal = ref(false)
const levelToDelete = ref<TableItem | null>(null)

onMounted(async () => {
  await gameLevelStore.fetchLevels()
})

const handleAddNew = () => {
  router.push({ name: 'adjust-game-level' })
}

const handleEdit = (item: TableItem) => {
  router.push({
    name: 'edit-game-level',
    params: { id: item.id.toString() }
  })
}

const openDeleteModal = (item: TableItem) => {
  levelToDelete.value = item
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (levelToDelete.value) {
    const success = await gameLevelStore.deleteLevel(levelToDelete.value.id)
    if (success) {
      await gameLevelStore.fetchLevels()
      showDeleteModal.value = false
      levelToDelete.value = null
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px var(--primary-color);
}

.actions-wrapper {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}

.empty-state p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.delete-confirmation {
  text-align: center;
  padding: 1rem;
}

.delete-warning {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.75rem;
  }

  h1 {
    font-size: 1.75rem;
  }
}
</style>
