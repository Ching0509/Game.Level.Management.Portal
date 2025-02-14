import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useLoadingStore } from '@/stores/loadingStore'
import { useErrorMsgStore } from '@/stores/errorMsgStore'

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function useAxios() {
  const loadingStore = useLoadingStore()
  const errorStore = useErrorMsgStore()

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      loadingStore.showLoading()
      return config
    },
    (error) => {
      loadingStore.hideLoading()
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      loadingStore.hideLoading()
      return response
    },
    (error) => {
      loadingStore.hideLoading()
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
      errorStore.showError(errorMessage)
      return Promise.reject(error)
    }
  )

  const get = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.get<T>(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.post<T>(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.put<T>(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const del = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.delete<T>(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    get,
    post,
    put,
    delete: del,
    axios: axiosInstance
  }
}
