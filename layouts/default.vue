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
  {
    label: '管理',
    value: '/manage/article',
  },
]);

const active = ref(tabs.value[0].value);

const { loggedIn, user } = useUserSession();

// const { pageLoading } = useAppConfig()
</script>

<template>
  <div scrollbar="~ rounded w-4px" class="h-100vh bg-common text-common">
    <div w-full flex items-center justify-between gap-20px p-30px pl-60px>
      <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
        <template #extra>
          <DarkToggle />
          <RefreshBtn />
        </template>
      </Tab>

      <a href="/api/auth/github" hover="bg-light-500" p-1 transition-all>
        <div cursor="pointer" bxl:github text-5 dark:text-white />
        <div v-if="loggedIn">{{ user }}</div>
      </a>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
