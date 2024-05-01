<script lang="ts" setup>
import type { ApiResult } from '~/server/types'

definePageMeta({
  layout: 'empty',
})

const [loading, load] = useToggle(false)

async function handlePublish(article: { title: string, content: string }) {
  load(true)
  await useFetch<ApiResult<{ id: string }>>('/api/article/add', {
    method: 'POST',
    body: article,
  })
  load(false)
  useRouter().push('/manage/article')
}
</script>

<template>
  <div hw-full>
    <ClientOnly>
      <ArticleEditor :loading="loading" @publish="handlePublish" />
    </ClientOnly>
    <div v-if="loading" i-svg-spinners:180-ring z-3 text-10 text-light-900 ab-c dark:text-gray-500 />
  </div>
</template>

<style scoped></style>
