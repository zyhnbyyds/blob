<script lang='ts' setup>
export interface HoverBoxProps {
  trigger?: 'hover' | 'click'
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<HoverBoxProps>(), {
  trigger: 'hover',
  position: 'bottom',
})
const boxRef = ref<HTMLElement | null>(null)
const boxConRef = ref<HTMLElement | null>(null)
// first time is no box-con element in the dom
const boxVisible = ref(false)
const boxShow = ref(false)

useEventListener(boxRef, props.trigger === 'hover' ? 'mouseenter' : 'click', () => {
  if (!boxVisible.value) {
    boxVisible.value = true
    boxShow.value = true
  }
})

const commonConfig = {
  common: 'bg-common text-white p-2 rounded-lg shadow-sm absolute hidden group-hover:block transition-all',
  top: '-top-100%',
  bottom: '-bottom-100%',
  left: '-left-100%',
  right: '-right-100%',
}
</script>

<template>
  <div class="group">
    <div ref="boxConRef" :class="[commonConfig.common, commonConfig[props.position]]">
      <slot name="box" />
    </div>
    <div ref="boxRef">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
