<script setup lang="ts">
import { theme } from 'ant-design-vue'

const antDTheme = ref(theme.darkAlgorithm)

onNuxtReady(() => {
  const colorMode = useColorMode()
  const isPrefersDark = usePreferredDark()

  watchEffect(() => {
    colorMode.preference = isPrefersDark.value ? 'dark' : 'light'
  })

  watchEffect(() => {
    antDTheme.value = colorMode.preference === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  })
})
</script>

<template>
  <NuxtLayout>
    <AConfigProvider
      :theme="{
        algorithm: antDTheme,
      }"
    >
      <NuxtPage keepalive />
    </AConfigProvider>
  </NuxtLayout>
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
