import axios from 'axios'
import { useLoadingStore } from '@/stores/loadingStore'
import { useErrorMsgStore } from '@/stores/errorMsgStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Log the API URL during development
if (import.meta.env.DEV) {
  console.log('API URL:', API_BASE_URL)
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore()
    loadingStore.showLoading()
    return config
  },
  (error) => {
    const loadingStore = useLoadingStore()
    loadingStore.hideLoading()
    return Promise.reject(error)
  }
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore()
    loadingStore.hideLoading()
    return response
  },
  (error) => {
    const loadingStore = useLoadingStore()
    const errorMsgStore = useErrorMsgStore()
    loadingStore.hideLoading()

    let errorMessage = 'An error occurred'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data?.message || 'Invalid input'
          break
        case 404:
          errorMessage = 'Resource not found'
          break
        case 500:
          errorMessage = 'Server error'
          break
        default:
          errorMessage = error.response.data?.message || 'An error occurred'
      }
    } else if (error.request) {
      errorMessage = 'Network error - please check your connection'
    }

    errorMsgStore.showError(errorMessage)
    return Promise.reject(error)
  }
)

export default axiosInstance
