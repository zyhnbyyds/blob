<script lang='ts' setup>
import type { ArticleItem, PageRes } from '~/server/types'

const { data, refresh, pending } = useFetch<PageRes<ArticleItem>>('/api/article/list', { method: 'GET', params: { page: 1, size: 1000 } })

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
  <div>
    <div i-clarity:refresh-line cursor-pointer @click="refresh()" />

    <div v-if="pending" text-10 ab-c text-gray-400 i-svg-spinners:12-dots-scale-rotate />

    <div v-else>
      <div
        v-for="item in data?.list ?? []"
        :key="item.id"
        class="my-4 p-3"
        cursor="pointer"
        active="bg-dark-800 bg-op20" border-b="1px solid red" @click="handleClickArticle(item)"
      >
        <div>{{ item.title }} --{{ item.createTime }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
