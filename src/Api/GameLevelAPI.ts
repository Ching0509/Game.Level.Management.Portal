import type { Block, GameLevel } from '@/stores/gameLevelStore'

// Mock data storage
const mockLevels: GameLevel[] = []

// Mock API delay
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300))

export const GameLevelAPI = {
  // Fetch all levels
  async fetchLevels(): Promise<GameLevel[]> {
    await mockDelay()
    return mockLevels
  },

  // Fetch a single level by ID
  async fetchLevelById(id: number): Promise<GameLevel | null> {
    await mockDelay()
    return mockLevels.find(level => level.id === id) || null
  },

  // Create a new level
  async createLevel(data: { name: string, blocks: Block[] }): Promise<GameLevel> {
    await mockDelay()
    const newLevel: GameLevel = {
      id: Date.now(),
      name: data.name,
      blocks: data.blocks
    }
    mockLevels.push(newLevel)
    return newLevel
  },

  // Update an existing level
  async updateLevel(id: number, data: Partial<GameLevel>): Promise<GameLevel | null> {
    await mockDelay()
    const index = mockLevels.findIndex(level => level.id === id)
    if (index !== -1) {
      mockLevels[index] = { ...mockLevels[index], ...data }
      return mockLevels[index]
    }
    return null
  },

  // Delete a level
  async deleteLevel(id: number): Promise<boolean> {
    await mockDelay()
    const index = mockLevels.findIndex(level => level.id === id)
    if (index !== -1) {
      mockLevels.splice(index, 1)
      return true
    }
    return false
  }
}
