<script setup lang="ts">
import './style/css/global.css'

const app = useAppConfig()

onNuxtReady(() => {
  const colorMode = useColorMode()
  const isPrefersDark = usePreferredDark()

  watch(
    () => isPrefersDark.value,
    (val) => {
      colorMode.preference = val ? 'dark' : 'light'
    },
  )

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
  <div class="relative hw-full">
    <NuxtLayout>
      <NuxtPage v-if="!app.pageLoading" :transition="{ name: 'fade-slide', duration: 400, mode: 'out-in' }" :page-key="route => route.fullPath" />
    </NuxtLayout>

    <ClientOnly>
      <MessageBox />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
@import url(./style/scss/global.scss);
@import url(./style/css/global.css);
</style>
