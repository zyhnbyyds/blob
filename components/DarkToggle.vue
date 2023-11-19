<script lang='ts' setup>
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <div class="text-red">
    <UToggle
      v-model="isDark"
      on-icon="i-streamline-emojis-sleeping-face"
      off-icon="i-streamline-emojis-grimacing-face"
    />
  </div>
</template>

<style scoped></style>
