/* eslint-disable import/no-mutable-exports */
import type { MessageBoxOptions } from '~/components/MessageBox.vue'
import { useAppStore } from '~/store/app'

let showMessage: (options: Partial<MessageBoxOptions>) => void

onNuxtReady(() => {
  const { messageBox } = storeToRefs(useAppStore())

  showMessage = (options: Partial<MessageBoxOptions> = { type: 'info', message: 'Message box', duration: 3000 }) => {
    if (messageBox.value.timer)
      clearTimeout(messageBox.value.timer)

    messageBox.value = useAssign(messageBox.value, options)
    messageBox.value.visible = true
    messageBox.value.timer = setTimeout(() => {
      messageBox.value.visible = false
    }, messageBox.value.duration)
  }
})

export {
  showMessage,
}
