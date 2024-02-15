<script setup lang="ts">
import { theme } from 'ant-design-vue'
import './style/global.css'

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
  <div hw-full>
    <NuxtLoadingIndicator :height="8" :duration="5000" />
    <NuxtLayout>
      <AConfigProvider
        :theme="{
          algorithm: antDTheme,
        }"
      >
        <NuxtPage keepalive :transition="{ name: 'fade', mode: 'out-in', duration: 200 }" />
      </AConfigProvider>
    </NuxtLayout>
  </div>
</template>

<style>

</style>
