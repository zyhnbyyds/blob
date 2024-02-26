<script lang="ts" setup>
const tabs = ref([
  {
    label: '首页',
    value: '/',
  },
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
  <div scrollbar="~ rounded w-1" class="h-100vh bg-common text-common">
    <div w-full flex items-center gap-20px p-30px pl-60px>
      <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
        <template #extra>
          <DarkToggle />
        </template>
      </Tab>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
