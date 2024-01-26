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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
</style>
