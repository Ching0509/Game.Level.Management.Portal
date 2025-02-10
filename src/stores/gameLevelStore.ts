import { defineStore } from 'pinia'
import { GameLevelAPI } from '@/Api/GameLevelAPI'

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

export const useGameLevelStore = defineStore('gameLevel', {
  state: () => ({
    levels: [] as GameLevel[],
    currentLevel: null as GameLevel | null
  }),

  actions: {
    async fetchLevels() {
      this.levels = await GameLevelAPI.fetchLevels()
    },

    async loadLevel(id: number) {
      const level = await GameLevelAPI.fetchLevelById(id)
      if (level) {
        this.currentLevel = level
      }
      return level
    },

    async createLevel(name: string, blocks: Block[]) {
      const newLevel = await GameLevelAPI.createLevel({ name, blocks })
      return newLevel
    },

    async updateLevel(id: number, data: Partial<GameLevel>) {
      const updatedLevel = await GameLevelAPI.updateLevel(id, data)
      if (updatedLevel) {
        const index = this.levels.findIndex(level => level.id === id)
        if (index !== -1) {
          this.levels[index] = updatedLevel
        }
        if (this.currentLevel?.id === id) {
          this.currentLevel = updatedLevel
        }
      }
      return updatedLevel
    },

    async deleteLevel(id: number) {
      const success = await GameLevelAPI.deleteLevel(id)
      if (success) {
        this.levels = this.levels.filter(level => level.id !== id)
        if (this.currentLevel?.id === id) {
          this.currentLevel = null
        }
      }
      return success
    }
  }
})
