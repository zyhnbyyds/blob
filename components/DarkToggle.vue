<script lang="ts" setup>
defineOptions({
  name: 'DarkToggle',
})

const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <Switch v-model="isDark" />
</template>

<style scoped></style>
