<script lang='ts' setup>
import type { ArticleItem, PageRes } from '~/server/types'

const { data, refresh, status } = useFetch<PageRes<ArticleItem>>('/api/article/list', { method: 'GET', params: { page: 1, size: 1000 } })

definePageMeta({
  title: '博客文章列表',
  description: '吃不胖的彭于晏的博客文章列表集合，在这里了解我更多一点吧',
  keywords: '博客 blob 文章 article 列表 list',
  auth: false,
})
</script>

<template>
  <div scrollbar="4px rounded" class="overflow-auto">
    <div>{{ status }}</div>

    <div @click="refresh()">
      刷新
    </div>

    <div
      v-for="item in data?.list ?? []"
      :key="item.id"
      class="my-4 p-3"
      cursor="pointer"
      active="bg-dark-800 bg-op20" border="1px solid red" @click="$router.push({
        path: '/article/detail',
        query: {
          id: item.id,
        },
      })"
    >
      <div>{{ item.title }} --{{ item.createTime }}</div>
    </div>
  </div>
</template>

<style scoped></style>
