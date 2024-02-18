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
  <div>
    <div
      :class="
        !isDark
          ? 'line-md:moon-alt-to-sunny-outline-loop-transition'
          : 'line-md:moon-rising-filled-alt-loop'
      "
      @click="isDark = !isDark"
    />
  </div>
</template>

<style scoped></style>
