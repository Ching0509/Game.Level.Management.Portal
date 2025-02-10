<template>
  <div class="block-selector">
    <div class="grid">
      <div 
        v-for="y in 5" 
        :key="`row-${y}`" 
        class="grid-row"
      >
        <div 
          v-for="x in 5" 
          :key="`cell-${x}-${y}`"
          class="grid-cell"
          :class="{
            'has-block': hasBlock(x - 1, y - 1),
            'cell-hover': !hasBlock(x - 1, y - 1)
          }"
          @click="handleCellClick(x - 1, y - 1)"
        >
          <div v-if="hasBlock(x - 1, y - 1)" class="block">
            <span class="block-remove" @click.stop="handleBlockRemove(x - 1, y - 1)">×</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Block } from '@/stores/gameLevelStore'

defineOptions({
  name: 'BlockSelector'
})

const props = defineProps<{
  blocks: Block[]
}>()

const emit = defineEmits<{
  'add-block': [x: number, y: number]
  'remove-block': [blockId: number]
}>()

const hasBlock = (x: number, y: number) => {
  return props.blocks.some(block => block.x === x && block.y === y)
}

const getBlockId = (x: number, y: number) => {
  const block = props.blocks.find(block => block.x === x && block.y === y)
  return block?.id
}

const handleCellClick = (x: number, y: number) => {
  if (!hasBlock(x, y)) {
    emit('add-block', x, y)
  }
}

const handleBlockRemove = (x: number, y: number) => {
  const blockId = getBlockId(x, y)
  if (blockId !== undefined) {
    emit('remove-block', blockId)
  }
}
</script>

<style scoped>
.block-selector {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
}

.grid-row {
  display: flex;
  gap: 0.5rem;
}

.grid-cell {
  aspect-ratio: 1;
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 0, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cell-hover:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: var(--primary-color);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
}

.has-block {
  cursor: default;
}

.block {
  position: absolute;
  inset: 4px;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: blockAppear 0.3s ease;
}

.block-remove {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.block:hover .block-remove {
  opacity: 1;
}

@keyframes blockAppear {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .block-selector {
    padding: 0.5rem;
  }

  .grid {
    gap: 0.25rem;
    padding: 0.5rem;
  }

  .grid-row {
    gap: 0.25rem;
  }
}
</style>
