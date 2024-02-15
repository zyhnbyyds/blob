<script lang='ts' setup>
// @ts-expect-error ignore
import { Editor } from '@bytemd/vue-next'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import highlight from '@bytemd/plugin-highlight'

defineOptions({
  name: 'ArticleEditor',
})

const props = defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  (e: 'publish', article: { title: string, content: string }): void
}>()

const { loading } = toRefs(props)

const plugins = [
  frontmatter(),
  gfm(),
  gemoji(),
  breaks(),
  highlight(),
]

definePageMeta({
  layout: 'empty',
})

const article = reactive({
  title: '',
  content: '',
})
</script>

<template>
  <div class="hw-full">
    <header h-60px flex px-30px items-center justify="between">
      <input v-model="article.title" text-24px outline-none class="w-60%" placeholder="输入文章标题...">
      <div flex-col-center gap-4>
        <a-button>
          草稿箱
        </a-button>
        <a-button :loading="loading" type="primary" @click="emits('publish', article)">
          发布
        </a-button>
        <DarkToggle />
      </div>
    </header>

    <div class="h-[calc(100%-120px)]">
      <!-- @vue-expect-error -->
      <Editor :plugins="plugins" :locale="zh_Hans" :value="article.content" @change="(val) => article.content = val" />
    </div>
  </div>
</template>

<style scoped></style>
