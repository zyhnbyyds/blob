<script lang="ts" setup>
// @ts-expect-error ignore
import { Editor } from '@bytemd/vue-next'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import { shikiPlugin } from '~/utils/bytemd'

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

const plugins = [frontmatter(), gfm(), gemoji(), breaks(), shikiPlugin()]

const article = reactive({
  title: '',
  content: '',
})
</script>

<template>
  <div class="hw-full">
    <header h-60px class="dark:bg-[#333]" flex items-center px-30px justify="between">
      <input
        v-model="article.title"
        text-20px
        outline-none
        class="w-60% px-3 py-2 dark:bg-[#333]"
        placeholder="输入文章标题..."
      >
      <div flex-col-center gap-4>
        <p> 草稿箱 </p>
        <p
          :loading="loading"
          @click="emits('publish', article)"
        >
          发布
        </p>
        <DarkToggle />
      </div>
    </header>

    <div class="bytemd-editor h-[calc(100%-60px)] w-full bg-common">
      <!-- @vue-expect-error -->
      <Editor
        :plugins="plugins"
        :locale="zh_Hans"
        :value="article.content"
        @change="(val) => (article.content = val)"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.bytemd-editor > div) {
  height: 100%;
  width: 100%;
}
:deep(.bytemd) {
  height: 100%;
}
</style>
