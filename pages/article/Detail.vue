<script lang='ts' setup>
import type { ArticleItem } from '~/server/types'

const { query } = useRoute()
const { data: detail } = useFetch<ArticleItem>('/api/article/detail', { method: 'GET', params: { id: query.id } })

definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    {{ detail?.content }}
  </div>
</template>

<style scoped></style>
