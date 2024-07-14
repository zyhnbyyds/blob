<script lang="ts" setup>
import type { TabItem } from './Tab.vue'

interface Props {
  tabs: TabItem[]
}

defineProps<Props>()

const active = ref<string>('')
</script>

<template>
  <header border-b="1px solid gray-400 op30" h-70px w-100vw flex items-center justify-between p-3 pl-10>
    <Tab v-model:value="active" :tabs="tabs" :is-route="true">
      <template #extra>
        <RefreshBtn />
      </template>
    </Tab>

    <div flex-center gap-2 text-4.5>
      <MeSign />

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

      <NuxtLink to="/manage" class="text-4.5">
        <Button size="sm">
          登录
        </Button>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped></style>
