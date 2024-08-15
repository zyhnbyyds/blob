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
  common: 'p-2  rounded-lg bg-green-200 hidden shadow-sm  min-w-40  transition-all w-auto',
}

const { x: boxX, y: boxY, height: boxH, width: boxW } = useElementBounding(boxRef)
const { height: boxConH, width: boxConW } = useElementBounding(boxConRef)
const { width, height } = useWindowSize()

/**
 * 动态计算 box 的位置、并规避 box 超出window边界
 */
const boxStyle = computed(() => {
  if (boxVisible.value) {
    let top = 0
    let left = 0
    switch (props.position) {
      case 'top':
        top = boxY.value - boxConH.value
        left = boxX.value + boxW.value / 2 - boxConW.value / 2
        break
      case 'bottom':
        top = boxY.value + boxH.value
        left = boxX.value + boxW.value / 2 - boxConW.value / 2
        break
      case 'left':
        top = boxY.value + boxH.value / 2 - boxConH.value / 2
        left = boxX.value - boxConW.value
        break
      case 'right':
        top = boxY.value + boxH.value / 2 - boxConH.value / 2
        left = boxX.value + boxW.value
        break
    }
    if (top < 0) {
      top = 0
    }
    if (left < 0) {
      left = 0
    }
    if (top + boxConH.value > height.value) {
      top = height.value - boxConH.value
    }
    if (left + boxConW.value > width.value) {
      left = width.value - boxConW.value
    }
    return {
      top: `${top}px`,
      left: `${left}px`,
    }
  }
  return {}
})
</script>

<template>
  <div class="group" relative>
    <div ref="boxConRef" :style="boxStyle" class="group-hover:block" :class="[commonConfig.common]">
      <slot name="box" />
    </div>
    <div ref="boxRef">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
