<script lang='ts' setup>
const menuList = [
  {
    title: 'Home',
    key: '/manage',
    icon: 'solar:home-angle-2-bold',
  },
  {
    title: 'Blob',
    key: '/manage/article',
    icon: 'solar:file-text-bold',
  },
  {
    title: 'User',
    key: '/manage/user',
    icon: 'solar:user-bold',
  },
  {
    title: 'Role',
    key: '/manage/role',
    icon: 'solar:shield-bold',
  },
  {
    title: 'Permission',
    key: '/manage/permission',
    icon: 'solar:shield-bold',
  },
  {
    title: 'Setting',
    key: '/manage/setting',
    icon: 'solar:settings-bold',
  },
  {
    title: 'Docs',
    key: '/manage/docs',
    icon: 'solar:settings-bold',
  },
]

const activeMenu = ref<string>(menuList[0].key)

const isFold = ref<boolean>(false)

const { width } = useWindowSize()

watch(width, () => {
  if (isFold.value)
    return
  if (width.value < 1000) {
    isFold.value = true
  }
  else {
    isFold.value = false
  }
})

defineExpose({
  activeMenu,
  isFold,
})
</script>

<template>
  <div :class="!isFold ? 'w-220px' : 'w-90px'" border-r="1px solid #E4E4E7 dark:gray-700 dark:op60" relative h-full px-4 transition-all duration-300>
    <ManageLeftHeader :is-fold="isFold" />
    <BMenu v-model="activeMenu" route :menus="menuList" :is-fold="isFold" />

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
