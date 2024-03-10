<script lang="ts" setup>
const tabs = ref([
  {
    label: '文章',
    value: '/article/list',
  },
  {
    label: '案例',
    value: '/demos',
  },
])

const active = ref(tabs.value[0].value)

const { loggedIn, user } = useUserSession()

const articleTitles = ref([
  {
    label: '文章',
    value: '/article/list',
  },
  {
    label: '案例',
    value: '/demos',
  },
  {
    label: '关于',
    value: '/about',
  },
  {
    label: '联系',
    value: '/contact',
  },
  // 添加更多的示例
  {
    label: '示例1',
    value: '/example1',
  },
  {
    label: '示例2',
    value: '/example2',
  },
  {
    label: '示例3',
    value: '/example3',
  },
  {
    label: '示例4',
    value: '/example4',
  },
  {
    label: '示例5',
    value: '/example5',
  },
  {
    label: '示例6',
    value: '/example6',
  },
  {
    label: '示例7',
    value: '/example7',
  },
  {
    label: '示例8',
    value: '/example8',
  },
  {
    label: '示例9',
    value: '/example9',
  },
  {
    label: '示例10',
    value: '/example10',
  },
  {
    label: '示例11',
    value: '/example11',
  },
  {
    label: '示例12',
    value: '/example12',
  },
  {
    label: '示例13',
    value: '/example13',
  },
  {
    label: '示例14',
    value: '/example14',
  },
  {
    label: '示例15',
    value: '/example15',
  },
  {
    label: '示例16',
    value: '/example16',
  },
  {
    label: '示例17',
    value: '/example17',
  },
  {
    label: '示例18',
    value: '/example18',
  },
  {
    label: '示例19',
    value: '/example19',
  },
  {
    label: '示例20',
    value: '/example20',
  },
  {
    label: '示例21',
    value: '/example21',
  },
  {
    label: '示例22',
    value: '/example22',
  },
  {
    label: '示例23',
    value: '/example23',
  },
  {
    label: '示例24',
    value: '/example24',
  },
  {
    label: '示例25',
    value: '/example25',
  },
  {
    label: '示例26',
    value: '/example26',
  },
])

const activeArticle = ref(0)
</script>

<template>
  <div>
    <div
      scrollbar="~ rounded w-8px dark:thumb-color-gray-600 dark:track-color-gray-800"
      class="h-100vh bg-common text-common"
    >
      <header w-full flex items-center justify-between gap-20px p-30px pl-60px>
        <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
          <template #extra>
            <RefreshBtn />
          </template>
        </Tab>

        <div flex-center gap-2 text-4.5>
          <DarkToggle />

          <FloatSelect v-model:value="activeArticle" :options="articleTitles" />

          <a
            href="https://github.com/zhang771"
            target="_blank"
            hover="bg-light-500 dark:bg-#333"
            p-1
            transition-colors
          >
            <div cursor="pointer" bxl:github dark:text-white />

            <div v-if="loggedIn">{{ user }}</div>
          </a>
        </div>
      </header>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
