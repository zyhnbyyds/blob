<script lang="ts" setup>
import type { ArticleItem } from '~/server/types'

const { query } = useRoute()
const { data: detail, pending } = useFetch<ArticleItem>('/api/article/detail', {
  method: 'GET',
  params: { id: query.id },
})
</script>

<template>
  <div flex-row-center>
    <div w-4xl border="1px solid light-500">
      <div
        v-if="pending"
        i-svg-spinners:12-dots-scale-rotate
        text-10
        text-gray-400
        ab-c
        dark:text-light-600
      />

      <div v-else>
        <ClientOnly>
          <ArticleViewer :content="detail ? detail.content : ''" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
