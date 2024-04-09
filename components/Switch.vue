<script lang='ts' setup>
const value = defineModel<boolean>()
</script>

<template>
  <div
    class="relative h-7 w-15 flex-col-center rounded-full p-1 transition-all"
    border="light-900 1 solid dark:gray-6"
    :class="!value ? 'bg-blue-400' : 'blur-0.4 shadow-md bg-dark-300'"
    @click="value = !value"
  >
    <div
      :class="value ? 'left-1 rotate-0 scale-90 bg-gray-6 shadow-lg text-gray-300' : 'left-8 bg-light-600 text-orange-500 scale-95 rotate-360deg '"
      class="absolute left-1 h-6 w-6 flex-center rounded-full transition-all duration-400"
    >
      <slot>
        <div v-if="!value" material-symbols:wb-sunny-outline />
        <div v-else material-symbols:nightlight-outline-rounded />
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
