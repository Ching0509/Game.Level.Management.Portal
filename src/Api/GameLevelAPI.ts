import type { Block, GameLevel } from '@/stores/gameLevelStore'
import axiosInstance from '@/utils/axiosInstance'

export const GameLevelAPI = {
  // Fetch all levels
  async fetchLevels(): Promise<GameLevel[]> {
    const response = await axiosInstance.get('/gamelevels')
    return response.data
  },

  // Fetch a single level by ID
  async fetchLevelById(id: number): Promise<GameLevel | null> {
    const response = await axiosInstance.get(`/gamelevels/${id}`)
    return response.data
  },

  // Create a new level
  async createLevel(data: { name: string, blocks: Block[] }): Promise<GameLevel> {
    const response = await axiosInstance.post('/gamelevels', data)
    return response.data
  },

  // Update an existing level
  async updateLevel(id: number, data: Partial<GameLevel>): Promise<GameLevel | null> {
    const response = await axiosInstance.put(`/gamelevels/${id}`, data)
    return response.data
  },

  // Delete a level
  async deleteLevel(id: number): Promise<boolean> {
    await axiosInstance.delete(`/gamelevels/${id}`)
    return true
  },

  // Check name availability
  async checkNameAvailability(name: string, excludeId?: number): Promise<boolean> {
    const params = new URLSearchParams({ name });
    if (excludeId !== undefined) {
      params.append('excludeId', excludeId.toString());
    }
    const response = await axiosInstance.get(`/gamelevels/check-name?${params}`);
    return response.data.isUnique;
  }
}