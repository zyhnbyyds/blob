<script lang="ts" setup>
import type { ArticleItem } from '~/server/types'

definePageMeta({
  layout: 'empty',
})

const { query } = useRoute()
const { data: detail } = apiGet<ArticleItem>('/api/article/detail', { id: query.id })
</script>

<template>
  <div flex-row-center>
    <div my-5 w-2xl rounded-1 bg-light-600 dark:bg-dark:400>
      <ClientOnly>
        <ArticleViewer :content="detail?.content ?? ''" />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
