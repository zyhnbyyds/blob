<script lang='ts' setup>
const props = defineProps<{
  /**
   * Reverse the switch value
   */
  reverse?: boolean
}>()

const value = defineModel<boolean>({ default: false })

const switchVal = computed(() => {
  return props.reverse ? !value.value : value.value
})
</script>

<template>
  <div
    class="relative h-7 w-15 flex-col-center cursor-pointer rounded-full p-1 shadow-md transition-all duration-400"
    :class="switchVal ? 'bg-blue-400' : 'blur-0.4 bg-dark-300'"
    @click="value = !value"
  >
    <div
      :class="!switchVal ? 'left-1 rotate-0 scale-90 bg-gray-6 shadow-lg text-gray-300' : 'left-8 bg-light-600 text-orange-500 scale-95 rotate-360deg '"
      class="absolute left-1 h-6 w-6 flex-center rounded-full transition-all duration-400"
    >
      <slot>
        <div text-3 text-shadow-md>
          <div v-if="switchVal" material-symbols:wb-sunny-outline />
          <div v-else material-symbols:nightlight-outline-rounded />
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
