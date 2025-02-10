import { createRouter, createWebHistory } from 'vue-router'
import GameLevel from '../pages/game-level/index.vue'
import AdjustGameLevel from '../pages/adjust-game-level/index.vue'
import Demo from '../pages/demo/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/game-level',
      name: 'game-level',
      component: GameLevel,
    },
    {
      path: '/adjust-game-level',
      name: 'adjust-game-level', 
      component: AdjustGameLevel,
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
    }
  ],
})

export default router
