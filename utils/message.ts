import type { MessageBoxOptions } from '~/components/MessageBox.vue'

function showMessage(options: Partial<MessageBoxOptions> = { type: 'info', message: 'Message box', duration: 3000 }) {
  const app = useAppConfig()
  return new Promise<void>((resolve) => {
    app.messageBox = useAssign({
      type: 'info',
      message: '',
      duration: 2000,
      visible: false,
      position: 'top',
      mask: false,
    }, options)

    if (import.meta.server)
      return

    if (app.messageBox.timer)
      clearTimeout(app.messageBox.timer)

    app.messageBox = useAssign(app.messageBox, options)
    app.messageBox.visible = true
    if (app.messageBox.type === 'loading' && !app.messageBox.duration) {
      resolve()
      return
    }
    else {
      app.messageBox.timer = setTimeout(() => {
        app.messageBox.visible = false
        resolve()
      }, app.messageBox.duration)
    }
  })
}

function closeMessage() {
  const app = useAppConfig()

  app.messageBox.visible = false

  if (app.messageBox.timer)
    clearTimeout(app.messageBox.timer)
}

export {
  showMessage,
  closeMessage,
}
