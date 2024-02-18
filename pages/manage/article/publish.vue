<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
});

const [loading, load] = useToggle(false);

async function handlePublish(article: { title: string; content: string }) {
  load(true);
  const { data } = await useFetch<{ id: string }>('/api/article/add', {
    method: 'POST',
    body: article,
  });
  load(false);

  if (data.value && data.value?.id)
    useRouter().push({
      path: '/manage/article/preview',
      query: { id: data.value.id },
    });
}
</script>

<template>
  <div hw-full>
    <ClientOnly>
      <ArticleEditor :loading="loading" @publish="handlePublish" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
