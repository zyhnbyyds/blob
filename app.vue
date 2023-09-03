<script setup lang="ts">
import { theme } from 'ant-design-vue'

const isDark = useDark()
</script>

<template>
  <VitePwaManifest />
  <AConfigProvider :theme="{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </AConfigProvider>

  <DarkToggle />
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
