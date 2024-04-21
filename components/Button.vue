<script lang='ts' setup>
export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  config?: Config
  icon?: string
  disabled?: boolean
  loading?: boolean
}

export interface Config {
  common?: string
  size?: {
    sm?: string
    md?: string
    lg?: string
  }
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  disabled: false,
})

const configPresets = {
  common: 'rounded-full inline-flex flex-center text-nowrap shadow-sm dark:shadow-gray-700 bg-[#3981F7] text-white cursor-pointer active:scale-99 hover:bg-op70 transition-colors duration-200 ease-in-out',
  size: {
    sm: 'text-3 px-5 py-2',
    md: 'text-3.5 px-6 py-2.5',
    lg: 'text-lg px-7 py-5',
  },
  disabled: 'cursor-not-allowed! bg-blue-300  text-gray-500',
}

const classes = computed(() => {
  return useAssign(configPresets, props.config)
})
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[classes.common, classes.size[props.size], [props.disabled ? classes.disabled : '']]"
  >
    <slot />
    <Transition>
      <div v-if="$props.loading" i-svg-spinners:180-ring ml-3 />
      <div v-else-if="props.icon" ml-3 scale-120 :class="props.icon" />
    </Transition>
  </button>
</template>

<style scoped></style>
