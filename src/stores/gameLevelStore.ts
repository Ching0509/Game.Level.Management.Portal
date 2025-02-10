import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Block {
  id: number
  x: number
  y: number
}

export interface GameLevel {
  id: number
  name: string
  blocks: Block[]
}

export const useGameLevelStore = defineStore('gameLevel', () => {
  const levels = ref<GameLevel[]>([])
  const currentLevel = ref<GameLevel | null>(null)

  // Mock API functions
  const fetchLevels = async () => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return levels.value
  }

  const fetchLevelById = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return levels.value.find(level => level.id === id) || null
  }

  const createLevel = async (name: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newLevel: GameLevel = {
      id: Date.now(),
      name,
      blocks: []
    }
    levels.value.push(newLevel)
    return newLevel
  }

  const updateLevel = async (id: number, data: Partial<GameLevel>) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = levels.value.findIndex(level => level.id === id)
    if (index !== -1) {
      levels.value[index] = { ...levels.value[index], ...data }
      return levels.value[index]
    }
    return null
  }

  const deleteLevel = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = levels.value.findIndex(level => level.id === id)
    if (index !== -1) {
      levels.value.splice(index, 1)
      return true
    }
    return false
  }

  // Block management functions
  const addBlock = async (levelId: number, x: number, y: number) => {
    const level = levels.value.find(l => l.id === levelId)
    if (!level) return null

    const newBlock: Block = {
      id: Date.now(),
      x,
      y
    }

    level.blocks.push(newBlock)
    return newBlock
  }

  const removeBlock = async (levelId: number, blockId: number) => {
    const level = levels.value.find(l => l.id === levelId)
    if (!level) return false

    const blockIndex = level.blocks.findIndex(b => b.id === blockId)
    if (blockIndex !== -1) {
      level.blocks.splice(blockIndex, 1)
      return true
    }
    return false
  }

  const loadLevel = async (id: number) => {
    currentLevel.value = await fetchLevelById(id)
    return currentLevel.value
  }

  return {
    levels,
    currentLevel,
    fetchLevels,
    fetchLevelById,
    createLevel,
    updateLevel,
    deleteLevel,
    addBlock,
    removeBlock,
    loadLevel
  }
})
