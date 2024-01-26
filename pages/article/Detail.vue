<script lang='ts' setup>
import type { ArticleItem } from '~/server/types'

const { query } = useRoute()
const { data: detail, pending } = useFetch<ArticleItem>('/api/article/detail', { method: 'GET', params: { id: query.id } })

definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    <div v-if="pending" text-10 absolute-center i-svg-spinners:12-dots-scale-rotate />

    <div v-else>
      {{ detail?.content }}
    </div>
  </div>
</template>

<style scoped></style>
