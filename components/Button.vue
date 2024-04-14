<script lang='ts' setup>
export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  config?: Config
  icon?: string
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
})

const configPresets = {
  common: 'rounded-full inline-flex text-nowrap bg-[#3981F7] text-white  dark:bg-dark-200 dark:text-gray-400 flex-col-center cursor-pointer active:scale-99 hover:bg-op70 transition-colors duration-200 ease-in-out',
  size: {
    sm: 'text-3 px-5 py-2 h-8',
    md: 'text-3.5 px-6 py-2.5 h-9',
    lg: 'text-lg px-7 py-5',
  },
}

const classes = computed(() => {
  return useAssign(configPresets, props.config)
})
</script>

<template>
  <div :class="[classes.common, classes.size[props.size]]">
    <slot />

    <div v-if="props.icon" ml-3 scale-120 :class="props.icon" />
  </div>
</template>

<style scoped></style>
