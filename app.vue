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
  <div>
    <NuxtPage />
    <DarkToggle />
  </div>
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
