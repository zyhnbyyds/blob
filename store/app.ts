import type { MessageBoxOptions } from '~/components/MessageBox.vue'

export const useAppStore = defineStore('app', () => {
  const messageBox = ref<MessageBoxOptions & { timer?: NodeJS.Timeout }>({
    type: 'info',
    message: 'Blob',
    duration: 3000,
    visible: false,
    position: 'top',
  })

  return {
    messageBox,
  }
})
