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
  common: 'p-2 absolute rounded-lg bg-green-200 hidden shadow-sm right-0 min-w-40  transition-all w-auto',
  top: '-top-100%',
  bottom: 'top-[calc(100%)]',
  left: '-left-100%',
  right: '-right-100%',
}

/**
 * 动态计算 box 的位置、并规避 box 超出window边界
 */
const boxStyle = computed(() => {
  if (!boxConRef.value || !boxRef.value)
    return {}
  const boxConRect = boxConRef.value.getBoundingClientRect()
  const boxRect = boxRef.value.getBoundingClientRect()
  const { height: windowHeight, width: windowWidth } = useWindowSize()
  const style: Record<string, string> = {}

  switch (props.position) {
    case 'top':
      style.top = `-${boxRect.height}px`
      if (boxConRect.top - boxRect.height < 0) {
        style.top = `${boxConRect.height}px` // 调整到下方
      }
      break
    case 'bottom':
      style.top = `${boxConRect.height}px`
      if (boxConRect.bottom + boxRect.height > windowHeight.value) {
        style.top = `-${boxRect.height}px` // 调整到上方
      }
      break
    case 'left':
      style.left = `-${boxRect.width}px`
      if (boxConRect.left - boxRect.width < 0) {
        style.left = `${boxConRect.width}px` // 调整到右侧
      }
      break
    case 'right':
      style.left = `${boxConRect.width}px`
      if (boxConRect.right + boxRect.width > windowWidth.value) {
        style.left = `-${boxRect.width}px` // 调整到左侧
      }
      break
  }

  return style
})
</script>

<template>
  <div class="group" relative>
    <div ref="boxConRef" :style="boxStyle" class="group-hover:block" :class="[commonConfig.common, commonConfig[props.position]]">
      <slot name="box" />
    </div>
    <div ref="boxRef">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
