<script lang="ts" setup>
const colorMode = useColorMode()
const isPrefersDark = usePreferredDark()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

isDark.value = isPrefersDark.value
</script>

<template>
  <ClientOnly>
    <Switch v-model="isDark" reverse />
  </ClientOnly>
</template>

<style scoped></style>
