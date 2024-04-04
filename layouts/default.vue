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
    class="h-100vh <sm:scrollbar-none bg-common text-common"
  >
    <Header :tabs="tabs" />

    <div class="min-h-[calc(100%-135px)]">
      <slot />
    </div>

    <ToTop :top="Math.abs(y)" @go-top="goTop()" />

    <Footer />
  </div>
</template>

<style scoped></style>
