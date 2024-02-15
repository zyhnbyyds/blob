<script lang='ts' setup>
import type { ArticleItem } from '~/server/types'

definePageMeta({
  layout: 'default',
})

const route = useRoute()

const { id } = route.query

const { data } = await useFetch<ArticleItem>('/api/article/detail', {
  method: 'GET',
  query: { id },
})
</script>

<template>
  <div>
    <ArticleViewer :content="data ? data.content : ''" />
  </div>
</template>

<style scoped></style>
