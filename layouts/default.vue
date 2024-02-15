<script lang='ts' setup>
const tabs = ref([
  {
    label: '文章',
    value: '/article/list',
  },
  {
    label: '案例',
    value: '/demos',
  },
  {
    label: '管理',
    value: '/manage/article',
  },
])

const active = ref(tabs.value[0].value)

const { loggedIn, user } = useUserSession()

// const { pageLoading } = useAppConfig()
</script>

<template>
  <div scrollbar="~ rounded w-4px" class="h-100vh text-common bg-common">
    <div w-full flex gap-20px items-center justify-between p-30px pl-60px>
      <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
        <template #extra>
          <DarkToggle />
          <RefreshBtn />
        </template>
      </Tab>

      <a href="/api/auth/github" hover="bg-light-500" transition-all p-1>
        <div text-5 dark:text-white cursor="pointer" bxl:github />
        <div v-if="loggedIn">{{ user }}</div>
      </a>
    </div>
    <slot />
  </div>
</template>

<style scoped>
</style>
