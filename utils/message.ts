/* eslint-disable import/no-mutable-exports */
import type { MessageBoxOptions } from '~/components/MessageBox.vue'
import { useAppStore } from '~/store/app'

let showMessage: (options: Partial<MessageBoxOptions>) => void
let closeMessage: () => void

onNuxtReady(() => {
  const { messageBox } = storeToRefs(useAppStore())

  showMessage = (options: Partial<MessageBoxOptions> = { type: 'info', message: 'Message box', duration: 3000 }) => {
    if (messageBox.value.timer)
      clearTimeout(messageBox.value.timer)

    messageBox.value = useAssign(messageBox.value, options)
    messageBox.value.visible = true
    if (messageBox.value.type === 'loading')
      return

    messageBox.value.timer = setTimeout(() => {
      messageBox.value.visible = false
    }, messageBox.value.duration)
  }

  closeMessage = () => {
    if (messageBox.value.timer)
      clearTimeout(messageBox.value.timer)
    messageBox.value.visible = false
  }
})

export {
  showMessage,
  closeMessage,
}
