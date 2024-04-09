<script lang='ts' setup>
const menuList = [
  {
    title: 'Home',
    path: '/manage',
    icon: 'solar:home-angle-2-bold',
  },
  {
    title: 'Blob',
    path: '/manage/article',
    icon: 'solar:file-text-bold',
  },
  {
    title: 'User',
    path: '/manage/user',
    icon: 'solar:user-bold',
  },
  {
    title: 'Setting',
    path: '/manage/setting',
    icon: 'solar:settings-bold',
  },
]

const activeMenu = ref<string>(menuList[0].path)

const isFold = ref<boolean>(false)

defineExpose({
  activeMenu,
  isFold,
})
</script>

<template>
  <div :class="!isFold ? 'w-58' : 'w-[calc(28px+4rem)]'" border-r="1px solid #E4E4E7 dark:gray-700 dark:op60" relative h-full px-4 transition-all duration-300>
    <ManageLeftHeader :is-fold="isFold" />
    <Menu v-model="activeMenu" :menus="menuList" :is-fold="isFold" />

    <div
      :class="!isFold ? '' : 'rotate-y-180deg'"
      hover="bg-light-600 dark:bg-dark-300" absolute bottom-6 right-6 h-10 w-10 flex-center rounded-full transition-all
      @click="isFold = !isFold"
    >
      <div class="line-md:arrow-close-left" transition-all duration-300 />
    </div>
  </div>
</template>

<style scoped></style>
