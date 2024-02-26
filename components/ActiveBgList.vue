<script lang="ts" setup>
interface ActiveBgListItem {
  label?: string
  value?: string
  [key: string]: any
}

interface Props {
  list: ActiveBgListItem[]
  labelField?: string
  valueField?: string
  isRoute?: boolean
  animate?: boolean
}

interface Emits {
  (event: 'change', val: any, idx: number): void
}

defineOptions({
  name: 'ActiveBgList',
})

const props = withDefaults(defineProps<Props>(), {
  labelField: 'label',
  isRoute: false,
  animate: true,
})

const emits = defineEmits<Emits>()

const { list, labelField } = toRefs(props)
const listRef = ref<HTMLElement>()
const actDiv = ref<HTMLDivElement>()

const childrenNodes = computed(() => {
  if (!listRef.value)
    return
  return listRef.value.children
})

function mouseleave() {
  if (actDiv.value)
    actDiv.value!.style.opacity = '0'

  setTimeout(() => {
    if (actDiv.value) {
      actDiv.value.style.transitionDuration = '0ms'
      actDiv.value.style.opacity = '0'
    }
  }, 100)
}

function mouseover(_ele: MouseEvent, index: number) {
  if (actDiv.value && childrenNodes.value) {
    const hoverElement = childrenNodes.value[index] as HTMLElement
    actDiv.value.style.top = `${hoverElement.offsetTop}px`
    actDiv.value.style.height = `${hoverElement.offsetHeight}px`
    setTimeout(() => {
      if (actDiv.value) {
        actDiv.value.style.transitionDuration = '150ms'
        actDiv.value.style.opacity = '1'
      }
    }, 100)
  }
}

function handleClickListItem(item: ActiveBgListItem, index: number) {
  emits('change', item, index)
}
</script>

<template>
  <div
    ref="listRef"
    class="relative z-2 max-w-3xl w-full flex flex-col"
    @mouseleave="mouseleave"
  >
    <div
      v-for="(item, i) in list"
      :key="i"
      class="relative z-10 cursor-pointer transition-transform duration-300"
      active="scale-99.6"
      @mouseover="mouseover($event, i)"
      @click="handleClickListItem(item, i)"
    >
      <slot name="list-item" :list-item="item">
        <span class="flex items-center px-3 py-3 leading-none">
          <span>{{ item[labelField] }}</span>
        </span>
      </slot>
    </div>
    <div
      ref="actDiv"
      dark="bg-dark-400"
      bg-light-400
      class="absolute h-40px w-full rounded-sm opacity-0 transition-all -top-40px"
    />
  </div>
</template>

<style scoped></style>
