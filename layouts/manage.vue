<script lang='ts' setup>
definePageMeta({
  title: '管理后台',
  description: '管理后台',
  keywords: '管理后台',
  layout: 'manage',
  auth: false,
})
const tabs = ref([
  {
    label: '文章',
    value: '/manage/article',
  },
  {
    label: '音乐',
    value: '/manage/music',
  },
  {
    label: '分类',
    value: '/manage/cate',
  },
])

const active = ref(tabs.value[0].value)
</script>

<template>
  <a-watermark content="manager">
    <div scrollbar="~ rounded w-1" class="h-100vh text-common bg-common">
      <div w-full flex gap-20px items-center p-30px pl-60px>
        <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
          <template #extra>
            <DarkToggle />
          </template>
        </Tab>
      </div>
      <slot />
    </div>
  </a-watermark>
</template>

<style scoped></style>
