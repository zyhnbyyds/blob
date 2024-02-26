<script lang="ts" setup>
export interface TabItem {
  label: string
  value: string
  icon?: string
  [key: string]: any
}

interface Props {
  value: string | number
  tabs: TabItem[]
  labelFiled?: string
  valueFiled?: string
  isRoute?: boolean
  followChange?: boolean
}

interface Emits {
  (event: 'update:value', e: string | number, index?: number): void
}

defineOptions({
  name: 'Tab',
})

const props = withDefaults(defineProps<Props>(), {
  labelFiled: 'label',
  valueFiled: 'value',
  isRoute: false,
  followChange: false,
})

const emits = defineEmits<Emits>()

const { followChange } = toRefs(props)
const isLoaded = ref(false)
const app = useAppConfig()

const activeIdx = computed(() => {
  return handleGetIdxByObjAttr(props.tabs, props.valueFiled, props.value)
})

const actTabVal = computed({
  get() {
    return props.value ? props.value : props.tabs[0].value
  },
  set(val) {
    emits('update:value', val, activeIdx.value)
  },
})

const tabsRef = ref<HTMLElement[]>()
const bgRef = ref<HTMLElement>()
const router = useRouter()

watch(
  () => app.isHeaderTextOrIcon,
  async () => {
    await nextTick()
    if (!tabsRef.value)
      return

    if (followChange.value) {
      setTimeout(() => {
        moveBgPoi(tabsRef.value![activeIdx.value])
      }, 100)
    }
  },
)

async function handleTabChange(value: string | number, index: number) {
  actTabVal.value = value
  if (props.isRoute)
    router.push({ path: value as string })
  await nextTick()
  if (!tabsRef.value)
    return
  moveBgPoi(tabsRef.value[index])
}

function moveBgPoi(ele: HTMLElement) {
  if (!bgRef.value)
    return
  bgRef.value.style.height = `${ele.offsetHeight}px`
  bgRef.value.style.width = `${ele.offsetWidth}px`
  bgRef.value.style.left = `${ele.offsetLeft}px`
}

onMounted(() => {
  if (!tabsRef.value)
    return
  moveBgPoi(tabsRef.value[actTabVal.value === -1 ? 0 : activeIdx.value])
  isLoaded.value = true
})
</script>

<template>
  <div
    class="shadow-style relative inline-flex items-center gap-2 rounded-6 bg-white px-2 py-2 text-gray-400 shadow-md dark:bg-#333"
  >
    <div
      v-for="(item, i) in props.tabs"
      ref="tabsRef"
      :key="i"
      cursor="pointer"
      class="relative z-10"
    >
      <div
        class="relative z-10 cursor-pointer rounded-3 px-4 py-1"
        :class="{
          'font-bold text-dark dark:text-white': actTabVal === item.value,
        }"
        @click="handleTabChange(item[props.valueFiled], i)"
      >
        <slot :data="item">
          {{ item.label }}
        </slot>
      </div>
    </div>
    <slot name="extra" />
    <div
      ref="bgRef"
      :class="{ 'transition-all duration-250': isLoaded }"
      class="shadow-style absolute top-2 z-1 h-8 w-16 rounded-4 bg-#e5e5e5 bg-opacity-40 transition-all duration-150 dark:bg-#444"
    />
  </div>
</template>

<style scoped>
.shadow-style {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
}
</style>
