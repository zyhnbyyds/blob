<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ArticleItem, PageRes, YearArticleItem } from '~/server/types'

const { data, pending } = useFetch<PageRes<YearArticleItem>>('/api/article/list', {
  method: 'GET',
  params: { page: 1, size: 1000, type: 'year' },
})

// 当一个 IntersectionObserver 对象被创建时，其被配置为监听根中一段给定比例的可见区域。
// 一旦 IntersectionObserver 被创建，则无法更改其配置，所以一个给定的观察者对象只能用
// 来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。
// link: https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
const anchors = reactive<{ [key: string]: Element }>({})
const currentAnchor = ref<string | null>(null)
const observer = ref<IntersectionObserver | null>(null)

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
    <div w-full px-30px py-2 lg="w-4xl">
      <Transition name="fade" mode="out-in">
        <div v-if="pending" ab-c>
          <div i-svg-spinners:180-ring text-10 text-light-900 dark:text-gray-500 />
        </div>

        <div v-else>
          <div v-if="data?.list.length !== 0">
            <div v-for="item in data?.list" :key="item._id" relative mb-10>
              <!-- year -->
              <h2 :id="`${item._id}`" :ref="el => { if (el) anchors[item._id] = el as Element }" hover="animate-pulse" py-5 text-7 text-gray-500>
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
                  <div class="group" relative flex items-center px-3 py-3 text-3.7 leading-none>
                    <span text-nowrap overflow="hidden" text="ellipsis">
                      {{ listItem.title }}
                    </span>

                    <!-- article createTime -->
                    <div absolute class="-left-25 <md:hidden" w-24>
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
      </Transition>
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
