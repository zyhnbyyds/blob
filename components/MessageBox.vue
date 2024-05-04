<script lang='ts' setup>
const app = useAppConfig()

const messageBox = computed(() => app.messageBox)

export interface MessageBoxOptions {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  message: string
  duration: number
  visible: boolean
  position: 'top' | 'bottom' | 'center'
  mask: boolean
}

const messageBoxConfig = {
  common: ' dark:bg-dark-400 px-6 font-bold flex-center gap-4 text-center transition-all rounded-full shadow-sm py-3 dark:text-gray-4',
  success: ['bg-green-500 text-white'],
  error: ['bg-red-500 text-white'],
  loading: ['bg-gradient-to-r from-cyan-500 shadow-blue-400 to-blue-500 text-white', 'i-svg-spinners:180-ring text-5'],
  warning: ['bg-yellow-500 text-white'],
  info: ['bg-blue-500 text-white'],
  top: 'top-1/12',
  bottom: 'bottom-1/6',
  center: 'bottom-1/2',
}
</script>

<template>
  <div relative>
    <Transition name="fade">
      <div v-if="messageBox.visible && messageBox.mask" class="fixed left-0 top-0 z-9998 h-100vh w-100vw bg-black bg-opacity-20 backdrop-blur-4" />
    </Transition>

    <div class="fixed-x-c z-9999" :class="messageBoxConfig[messageBox.position]">
      <Transition name="fade-scale">
        <div v-if="messageBox.visible" :class="[messageBoxConfig.common, messageBoxConfig[messageBox.type][0]]">
          <div v-if="messageBoxConfig[messageBox.type][1]" inline-block :class="messageBoxConfig[messageBox.type][1]" />
          <span>
            {{ messageBox.message }}
          </span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.bg-image-none {
  background-image: none;
}
</style>
