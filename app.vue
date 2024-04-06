<script setup lang="ts">
import './style/css/global.css'

const app = useAppConfig()

onNuxtReady(() => {
  const colorMode = useColorMode()
  const isPrefersDark = usePreferredDark()

  watchEffect(() => {
    colorMode.preference = isPrefersDark.value ? 'dark' : 'light'
  })

  watch(
    () => app.pageLoading,
    (val) => {
      nextTick(() => {
        if (val)
          app.pageLoading = false
      })
    },
  )
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage v-if="!app.pageLoading" :transition="{ name: 'fade-slide', duration: 400, mode: 'out-in' }" :page-key="route => route.fullPath" />
  </NuxtLayout>
</template>

<style lang="scss">
@import url(./style/scss/global.scss);
@import url(./style/css/global.css);
</style>
