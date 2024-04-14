<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <ClientOnly>
    <Switch v-model="isDark" reverse />
  </ClientOnly>
</template>

<style scoped></style>
