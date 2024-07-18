<script lang="ts" setup>
import type { ArticleItem } from '~/server/types'

definePageMeta({
  layout: 'empty',
})

const { query } = useRoute()
const { data: detail } = apiGet<ArticleItem>('/api/article/detail', { id: query.id })

const [showSide] = useToggle(true)
</script>

<template>
  <div py-4 class="relative h-100vh overflow-auto text-center">
    <div hover="op100" sticky top-0 mr-5 inline-block overflow-hidden rounded-md p-2 px-2 align-top op-70 transition-opacity hover:bg-light-500 dark:hover:bg-dark:400 class="hide-left" @click="$router.back()">
      <div solar:round-alt-arrow-left-line-duotone text-lg />
    </div>
    <div mr-5 inline-block rounded-1 class="<sm:m-2 <sm:mr-0 <sm:w-full" bg-light-500 px-2 sm:w-2xl dark:bg-dark:400>
      <div h-2 />
      <div flex-col-center justify-between px-2>
        <DarkToggle />
        <div flex-col-center gap-5>
          <span class="text-12px text-dark-100 text-op60 dark:text-gray">
            {{ detail?.createTime }}
          </span>
          <img img src="/public/logo.ico" h-6 w-6 rounded-full>
        </div>
      </div>
      <ArticleViewer text-left :content="detail?.content ?? ''" />
    </div>
    <div sticky top-0 inline-block overflow-hidden px-2 align-top transition-width class="hide-left" :class="showSide ? 'w-60' : 'w-1'">
      <!-- <div class="absolute top-2 -left-2px" solar:round-alt-arrow-right-line-duotone @click="showSideToggle()" /> -->
      <div class="md-side-title" bg-light-500 p-2 dark:bg-dark:400 />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1000px) {
  .hide-left {
    display: none;
  }
}
</style>
