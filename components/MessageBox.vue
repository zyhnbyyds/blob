<script lang='ts' setup>
import { useAppStore } from '~/store/app'

export interface MessageBoxOptions {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration: number
  visible: boolean
  position: 'top' | 'bottom' | 'center'
}

const messageBoxConfig = {
  common: ' dark:bg-dark-400 px-6 font-bold transition-all rounded-full shadow-md py-3 dark:text-gray-4',
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
  top: 'top-1/12',
  bottom: 'bottom-1/6',
  center: 'bottom-1/2',
}

const { messageBox } = storeToRefs(useAppStore())
</script>

<template>
  <div class="z-1000 ab-x-c" :class="messageBoxConfig[messageBox.position]">
    <Transition name="fade-scale">
      <div v-if="messageBox.visible" :class="[messageBoxConfig.common, messageBoxConfig[messageBox.type]]">
        {{ messageBox.message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
