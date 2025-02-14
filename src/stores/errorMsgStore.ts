import { defineStore } from 'pinia'

export const useErrorMsgStore = defineStore('errorMsg', {
  state: () => ({
    isShowed: false,
    errorMsg: ''
  }),

  actions: {
    showError(msg: string) {
      this.errorMsg = msg
      this.isShowed = true
    },

    hideError() {
      this.isShowed = false
      this.errorMsg = ''
    }
  }
})

