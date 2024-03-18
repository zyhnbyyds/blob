<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ArticleItem, PageRes, YearArticleItem } from '~/server/types'

const { data, pending } = useFetch<PageRes<YearArticleItem>>('/api/article/list', {
  method: 'GET',
  params: { page: 1, size: 1000 },
})

definePageMeta({
  auth: false,
  keepalive: true,
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
        text-9
        text-gray-400
        ab-c
      />

      <div v-else>
        <div v-for="item in data?.list" :key="item._id" relative mb-10>
          <section :id="`${item._id}-year`" hover="animate-pulse" flex-center py-10 text-5 text-gray-500 cursor="wait">
            --- 😒{{ item._id }} ---
          </section>
          <ActiveBgList
            z-2
            :list="item.articles"
            label-field="title"
            value-field="id"
            :is-route="true"
            @change="handleClickArticle"
          >
            <template #list-item="{ listItem }">
              <div class="group" relative flex items-center px-3 py-3 text-4 leading-none>
                <span text-nowrap overflow="hidden" text="ellipsis">
                  {{ listItem.title }}
                </span>

                <div absolute class="-left-25" w-24>
                  <span
                    group-hover="bg-light-600 dark:bg-#333 text-gray-600 dark:text-gray-300 font-600"
                    class="transition-all"
                    flex-center rounded-sm px-2 py-1 text-3 text-gray
                  >
                    {{ dayjs(listItem.createTime).format('MM-DD hh:mm') }}
                  </span>
                </div>
              </div>
            </template>
          </ActiveBgList>
        </div>
      </div>
    </div>

    <div fixed right-10 class="h-[calc(100vh-104px)] pt-20">
      <div>
        <div v-for="item in (data?.list ?? [])" :key="item._id" class="group" flex-col-center justify="end" gap-2 py-3>
          <div class="h2 w2 rounded bg-gray-200 transition-all hidden" group-hover="block underline-dotted" />
          <a :href="`#${item._id}-year`" class="cursor-pointer px-2 py-1 text-4 text-gray-500 transition-all" group-hover="bg-gray-200">
            {{ item._id }}
          </a>
        </div>
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
