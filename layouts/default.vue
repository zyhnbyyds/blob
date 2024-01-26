<script lang='ts' setup>
const tabs = ref([
  {
    label: '文章列表',
    path: '/article/list',
  },
  {
    label: '文章管理',
    path: '/manage/article',
  },
])
</script>

<template>
  <div scrollbar="~ rounded" class="h-100vh text-common bg-common">
    <div w-full flex gap-20px items-center justify-end p-30px>
      <DarkToggle />
      <div v-for="item in tabs" :key="item.path">
        <NuxtLink :to="item.path" class="underline-unset">
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
