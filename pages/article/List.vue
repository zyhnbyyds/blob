<script lang='ts' setup>
import type { ArticleItem, PageRes } from '~/server/types'

const { data, pending } = useFetch<PageRes<ArticleItem>>('/api/article/list', { method: 'GET', params: { page: 1, size: 1000 } })

definePageMeta({
  title: '博客文章列表',
  description: '吃不胖的彭于晏的博客文章列表集合，在这里了解我更多一点吧',
  keywords: '博客 blob 文章 article 列表 list',
  auth: false,
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
    <div px-30px py-2 max-w-2xl>
      <div v-if="pending" text-10 ab-c text-gray-400 i-svg-spinners:12-dots-scale-rotate />

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
