<script lang='ts' setup>
import type { ArticleItem } from '~/server/types'

definePageMeta({
  keepalive: false,
})

const { query } = useRoute()
const { data: detail, pending } = useFetch<ArticleItem>('/api/article/detail', { method: 'GET', params: { id: query.id } })
</script>

<template>
  <div flex-row-center>
    <div w-4xl>
      <div v-if="pending" text-10 absolute-center i-svg-spinners:12-dots-scale-rotate />

      <div v-else>
        <ArticleViewer :content="detail ? detail.content : ''" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
