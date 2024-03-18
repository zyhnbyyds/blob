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

const { loggedIn, user } = useUserSession()
</script>

<template>
  <div
    scrollbar="~ w-12px dark:thumb-color-dark-100 dark:track-color-#1a1a1a"
    class="h-100vh bg-common text-common"
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
          href="https://github.com/zhang771"
          target="_blank"
          hover="bg-light-500 dark:bg-#333"
          p-1
          transition-colors
        >
          <div cursor="pointer" bxl:github dark:text-white />

          <div v-if="loggedIn">{{ user }}</div>
        </a>
      </div>
    </header>
    <slot />
  </div>
</template>

<style scoped></style>
