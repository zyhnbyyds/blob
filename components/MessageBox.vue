<script lang='ts' setup>
import { useAppStore } from '~/store/app'

export interface MessageBoxOptions {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  message: string
  duration: number
  visible: boolean
  position: 'top' | 'bottom' | 'center'
}

const messageBoxConfig = {
  common: ' dark:bg-dark-400 px-6 font-bold flex-center gap-4 text-center transition-all rounded-full shadow-md py-3 dark:text-gray-4',
  success: ['bg-green-500 text-white'],
  error: ['bg-red-500 text-white'],
  loading: ['bg-blue-300 text-white', 'i-svg-spinners:180-ring text-5'],
  warning: ['bg-yellow-500 text-white'],
  info: ['bg-blue-500 text-white'],
  top: 'top-1/12',
  bottom: 'bottom-1/6',
  center: 'bottom-1/2',
}

const { messageBox } = storeToRefs(useAppStore())
</script>

<template>
  <div class="z-1000 ab-x-c" :class="messageBoxConfig[messageBox.position]">
    <Transition name="fade-scale">
      <div v-if="messageBox.visible" :class="[messageBoxConfig.common, messageBoxConfig[messageBox.type][0]]">
        <div inline-block :class="messageBoxConfig[messageBox.type][1]" />
        <span>
          {{ messageBox.message }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
