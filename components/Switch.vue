<script lang='ts' setup>
const value = defineModel<boolean>()
</script>

<template>
  <div class="relative h-9 w-20 flex-col-center rounded-full p-1 transition-all" border="light-900 1 solid" :class="!value ? 'bg-blue-400' : 'blur-0.4 shadow-md'" @click="value = !value">
    <div :class="value ? 'left-1 rotate-0 scale-90 bg-gray-4' : 'left-12 scale-95 rotate-360deg bg-white'" class="absolute left-1 h-7 w-7 flex-center rounded-full transition-all duration-450">
      <slot>
        <div v-if="!value" material-symbols:wb-sunny-outline />
        <div v-else material-symbols:nightlight-outline-rounded />
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
