<template>
  <div class="table-container">
    <table class="level-table">
      <thead>
        <tr>
          <th>Level Name</th>
          <th class="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td class="actions-column">
            <slot name="actions" :item="item">
              <!-- Default content if no slot is provided -->
              <div class="actions-wrapper">
                <span>No actions defined</span>
              </div>
            </slot>
          </td>
        </tr>
        <tr v-if="!items || items.length === 0">
          <td colspan="2" class="empty-state">
            <slot name="empty"> No levels found </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "LevelTable",
});

export interface TableItem {
  id: number;
  name: string;
}

defineProps<{
  items: TableItem[];
}>();
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
}

.level-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--text-color);
}

.level-table th {
  text-align: left;
  padding: 1rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 2px solid var(--primary-color);
  color: var(--secondary-color);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.level-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 0, 255, 0.1);
  transition: all 0.3s ease;
}

.level-table tbody tr {
  transition: all 0.3s ease;
}

.level-table tbody tr:hover {
  background: rgba(255, 0, 255, 0.05);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
}

.actions-column {
  width: 200px;
  text-align: right;
}

.actions-wrapper {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

@media (max-width: 768px) {
  .table-container {
    padding: 0.5rem;
  }

  .level-table th,
  .level-table td {
    padding: 0.75rem;
  }

  .actions-column {
    width: 160px;
  }
}

@media (max-width: 480px) {
  .level-table th,
  .level-table td {
    padding: 0.5rem;
  }

  .actions-column {
    width: 120px;
  }
}
</style>
