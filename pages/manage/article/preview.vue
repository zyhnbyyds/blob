<script lang="ts" setup>
import type { ArticleItem } from '~/server/types'

definePageMeta({
  layout: 'default',
})

const route = useRoute()

const { id } = route.query

const { data } = await apiGet<ArticleItem>('/api/article/detail', { id })
</script>

<template>
  <div>
    <ClientOnly>
      <ArticleViewer :content="data?.content ?? ''" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
