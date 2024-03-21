<script lang="ts" setup>
const tabs = ref([
  {
    label: '文章',
    value: '/article/list',
  },
  {
    label: '案例',
    value: '/demos',
  },
])

const active = ref(tabs.value[0].value)

const defaultLayoutRef = ref<HTMLDivElement>()

const { y } = useScroll(defaultLayoutRef)

const router = useRouter()

router.beforeEach((to, from, next) => {
  if (to.path === '/article/detail' && from.path === '/article/list')
    useSessionStorage('articleListScrollTop', y.value).value = y.value

  if (to.path === '/article/list' && from.path === '/article/detail')
    y.value = useSessionStorage('articleListScrollTop', y.value).value
  next()
})

function goTop() {
  y.value = 0
}
</script>

<template>
  <div
    ref="defaultLayoutRef"
    scrollbar="~ w-12px dark:thumb-color-dark-100 dark:track-color-#1a1a1a"
    class="h-100vh overflow-scroll bg-common text-common"
  >
    <header w-full flex items-center justify-between gap-20px p-30px pl-60px>
      <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
        <template #extra>
          <RefreshBtn />
        </template>
      </Tab>

      <div flex-center gap-2 text-4.5>
        <DarkToggle />

        <a
          href="https://github.com/zyhnbyyds"
          target="_blank"
          hover="bg-light-500 dark:bg-#333"
          p-1
          transition-colors
        >
          <div cursor="pointer" bxl:github dark:text-white />
        </a>
      </div>
    </header>
    <slot />

    <ToTop :top="Math.abs(y)" @go-top="goTop()" />
  </div>
</template>

<style scoped></style>
