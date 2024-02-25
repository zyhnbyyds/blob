<script lang="ts" setup>
import type { ArticleItem } from '~/server/types';

definePageMeta({
  layout: 'default',
});

const route = useRoute();

const { id } = route.query;

const { data } = await useFetch<ArticleItem>('/api/article/detail', {
  method: 'GET',
  query: { id },
});
</script>

<template>
  <ClientOnly>
    <ArticleViewer :content="data ? data.content : ''" />
  </ClientOnly>
</template>

<style scoped></style>
