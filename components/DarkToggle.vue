<script lang="ts" setup>
defineOptions({
  name: 'DarkToggle',
});

const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <div
    cursor-pointer
    :class="
      !isDark
        ? 'material-symbols:wb-sunny-outline'
        : 'material-symbols:nightlight-outline-rounded'
    "
    @click="isDark = !isDark"
  />
</template>

<style scoped></style>
