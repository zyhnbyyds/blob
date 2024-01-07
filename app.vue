<script setup lang="ts">
onNuxtReady(() => {
  const colorMode = useColorMode()
  const isPrefersDark = usePreferredDark()

  watchEffect(() => {
    colorMode.preference = isPrefersDark.value ? 'dark' : 'light'
  })
})
</script>

<template>
  <NuxtPage />
</template>

<style>
#__nuxt, html {
  height: 100%;
}

html.dark {
  background-color: #1a202c;
  color: #fff;
}
</style>
