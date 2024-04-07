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
  common: 'rounded-full bg-[#3981F7] text-white flex-col-center cursor-pointer active:scale-99 hover:bg-blue-400 transition-colors duration-200 ease-in-out',
  size: {
    sm: 'text-sm px-5 py-3',
    md: 'text-base px-6 py-4',
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

    <div v-if="props.icon" ml-2 scale-120 :class="props.icon" />
  </div>
</template>

<style scoped></style>
