<template>
  <div class="container">
    <div class="page-header">
      <h1>Game Levels</h1>
      <BaseButton @click="handleAddNew">Add New Level</BaseButton>
    </div>

    <LevelTable :items="levels">
      <template #actions="{ item }">
        <div class="actions-wrapper">
          <BaseButton 
            size="sm" 
            @click="handleEdit(item)"
          >
            Edit
          </BaseButton>
          <BaseButton 
            variant="secondary" 
            size="sm"
            @click="handleDelete(item)"
          >
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LevelTable, { type TableItem } from './components/LevelTable.vue'
import BaseButton from '@/components/BaseButton.vue'

defineOptions({
  name: 'GameLevelPage'
})

const router = useRouter()

// Mock data - replace with actual API calls
const levels = ref<TableItem[]>([
  { id: 1, name: 'Tutorial Level' },
  { id: 2, name: 'Level 1: The Beginning' },
  { id: 3, name: 'Level 2: The Challenge' }
])

const handleAddNew = () => {
  router.push('/adjust-game-level')
}

const handleEdit = (item: TableItem) => {
  router.push(`/adjust-game-level/${item.id}`)
}

const handleDelete = (item: TableItem) => {
  // Implement delete logic
  if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
    levels.value = levels.value.filter(level => level.id !== item.id)
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
