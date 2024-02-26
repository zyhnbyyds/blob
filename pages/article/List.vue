<script lang="ts" setup>
import type { ArticleItem, PageRes } from '~/server/types'

const { data, pending } = useFetch<PageRes<ArticleItem>>('/api/article/list', {
  method: 'GET',
  params: { page: 1, size: 1000 },
})

definePageMeta({
  auth: false,
  keepalive: false,
})

function handleClickArticle(item: ArticleItem) {
  useRouter().push({
    path: '/article/detail',
    query: {
      id: item.id,
    },
  })
}
</script>

<template>
  <div flex-row-center>
    <div w-4xl px-30px py-2>
      <div
        v-if="pending"
        i-svg-spinners:12-dots-scale-rotate
        text-8
        text-gray-400
        ab-c
      />

      <div v-else>
        <ActiveBgList
          :list="data?.list ?? []"
          label-field="title"
          value-field="id"
          :is-route="true"
          @change="handleClickArticle"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
::selection {
  background-color: #444;
  color: gray;
}
</style>
