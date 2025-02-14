import { defineStore } from 'pinia'
import { GameLevelAPI } from '@/Api/GameLevelAPI'
import { useErrorMsgStore } from './errorMsgStore'

export interface Block {
  id?: number
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
      try {
        this.levels = await GameLevelAPI.fetchLevels()
      } catch (error) {
        const errorStore = useErrorMsgStore()
        errorStore.showError('Failed to fetch levels')
        throw error
      }
    },

    async loadLevel(id: number) {
      try {
        const level = await GameLevelAPI.fetchLevelById(id)
        if (level) {
          this.currentLevel = level
        }
        return level
      } catch (error) {
        const errorStore = useErrorMsgStore()
        errorStore.showError('Failed to load level')
        throw error
      }
    },

    async createLevel(name: string, blocks: Block[]) {
      try {
        const newLevel = await GameLevelAPI.createLevel({ name, blocks })
        this.levels.push(newLevel)
        return newLevel
      } catch (error) {
        const errorStore = useErrorMsgStore()
        errorStore.showError('Failed to create level')
        throw error
      }
    },

    async updateLevel(id: number, data: Partial<GameLevel>) {
      try {
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
      } catch (error) {
        const errorStore = useErrorMsgStore()
        errorStore.showError('Failed to update level')
        throw error
      }
    },

    async deleteLevel(id: number) {
      try {
        const success = await GameLevelAPI.deleteLevel(id)
        if (success) {
          this.levels = this.levels.filter(level => level.id !== id)
          if (this.currentLevel?.id === id) {
            this.currentLevel = null
          }
        }
        return success
      } catch (error) {
        const errorStore = useErrorMsgStore()
        errorStore.showError('Failed to delete level')
        throw error
      }
    }
  }
})
