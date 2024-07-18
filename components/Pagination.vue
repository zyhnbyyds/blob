<script lang='ts' setup>
export interface PaginationProps {
  page: number
  total: number
  size: number
  [key: string]: any
}

const props = defineProps<PaginationProps>()

defineEmits<
  {
    change: [page: number]
  }
>()

const pages = computed(() => {
  const totalPage = Math.ceil(props.total / props.size)
  const start = Math.max(1, props.page - 5)
  const end = Math.min(totalPage, start + 9)

  const showPages = Array.from({ length: end - start + 1 }, (_, i) => i + start)

  return showPages.length >= 1 ? showPages : 1
})

const common = {
  hover: 'bg-light-600',
  sideBtn: 'transition-all px-3 py-1 rounded-1 text-center cursor-pointer hover:dark:bg-dark-300',
  pageBtn: 'h-6 w-6 flex-center rounded-1 text-center cursor-pointer hover:dark:bg-dark-300',
  activePage: 'bg-light-blue-500 text-white hover:bg-light-blue-500',
}
</script>

<template>
  <div class="h-30px w-full flex-center gap-5">
    <div :hover="common.hover" class="" :class="[common.sideBtn]" @click="$emit('change', props.page - 1 > 0 ? props.page - 1 : 1)">
      Prev
    </div>
    <div flex border-x="1px solid light-700" gap-2 px-5>
      <div v-for="p in pages" :key="p">
        <div
          :hover="common.hover"
          :class="[common.pageBtn, props.page === p ? common.activePage : '']"
          @click="$emit('change', p)"
        >
          {{ p }}
        </div>
      </div>
    </div>
    <div :hover="common.hover" class="" :class="[common.sideBtn]" @click="$emit('change', (props.page + 1) > props.total ? props.page : props.page + 1)">
      Next
    </div>
  </div>
</template>

<style scoped></style>
