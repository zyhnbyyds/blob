<script setup lang="ts">
import { theme } from 'ant-design-vue'

const colorMode = useColorMode()
const isPrefersDark = usePreferredDark()

onNuxtReady(() => {
  watchEffect(() => {
    colorMode.preference = isPrefersDark.value ? 'dark' : 'light'
  })
})
</script>

<template>
  <AConfigProvider
    :theme="{
      algorithm: colorMode.preference === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <NuxtLayout>
      <NuxtPage keepalive />
    </NuxtLayout>
  </AConfigProvider>
</template>

<style>
html.dark ::selection {
  color: #e5e5e5;
  background-color: gray;
}

html ::selection {
  color: #555;
  background-color: #e5e5e5;
}
</style>
