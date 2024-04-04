<script lang="ts" setup>
import type { TabItem } from './Tab.vue'

interface Props {
  tabs: TabItem[]
}

defineProps<Props>()

const active = ref<string>('')
</script>

<template>
  <header h-70px w-full flex items-center justify-between p-3 pl-10 class="dark:bg-dark-300">
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
    </div>
  </header>
</template>

<style scoped></style>
