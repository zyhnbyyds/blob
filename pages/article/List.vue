<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ArticleItem, PageRes, YearArticleItem } from '~/server/types'

const { data } = apiGet<PageRes<YearArticleItem>>('/api/article/list', { page: 1, size: 1000, type: 'year' })

const anchors = reactive<{ [key: string]: Element }>({})
const currentAnchor = ref<string | null>(null)
const observer = ref<any>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          currentAnchor.value = entry.target.id
      })
    },
    { threshold: 0.7 },
  )

  Object.values(anchors).forEach((anchor) => {
    observer.value?.observe(anchor)
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})

function handleClickArticle(item: ArticleItem) {
  useRouter().push({
    path: '/article/detail',
    query: {
      id: item.id,
    },
  })
}

function handleLinkClick(id: string) {
  currentAnchor.value = id
  const el = anchors[id]
  if (el)
    el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div flex-row-center>
    <div w-full px-3 py-2 lg="w-3xl">
      <div v-if="data?.list.length !== 0">
        <div v-for="item in data?.list" :key="item._id" relative mb-10>
          <!-- year -->
          <h2 :id="`${item._id}`" :ref="el => { if (el) anchors[item._id] = el as Element }" style="letter-spacing: 7px;" hover="animate-pulse" px-3 py-5 text-7 text-gray-500>
            <NuxtLink :href="`#${item._id}`" class="font-maShan" external @click.prevent="handleLinkClick(String(item._id))">
              {{ item._id }}
            </NuxtLink>
          </h2>

          <ActiveBgList
            z-2
            :list="item.articles"
            label-field="title"
            value-field="id"
            :is-route="true"
            @change="handleClickArticle"
          >
            <template #list-item="{ listItem }">
              <div class="group" relative flex items-center p-2.5 text-3.4 leading-none>
                <span text-nowrap overflow="hidden" text="ellipsis">
                  {{ listItem.title }}
                </span>

                <!-- article createTime -->
                <div absolute class="-left-25 <lg:hidden" w-24>
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
      <div v-else>
        <EmptyList />
      </div>
    </div>

    <!-- right years nav -->
    <div fixed right-10 lg="block" class="h-[calc(100vh-104px)] pt-20 hidden">
      <div>
        <div v-for="item in (data?.list ?? [])" :key="item._id" class="group" flex-col-center justify="end" gap-2 py-3>
          <div :class="[currentAnchor === String(item._id) ? 'block dark:bg-gray-200 bg-gray-300' : 'hidden']" class="h2 w2 rounded transition-all" />
          <NuxtLink
            :class="[currentAnchor === String(item._id) ? 'dark:text-gray-100 text-dark' : 'text-gray-400']"
            external :to="`#${item._id}`"
            class="cursor-pointer px-2 py-1 text-4 transition-all"
            group-hover="bg-light-600 dark:bg-#333"
            @click.prevent="handleLinkClick(String(item._id))"
          >
            {{ item._id }}
          </NuxtLink>
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
