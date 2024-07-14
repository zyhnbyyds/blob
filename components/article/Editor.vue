<script lang="ts" setup>
// @ts-expect-error package error
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
const editorRef = ref<Editor>()

const plugins = [frontmatter(), gfm(), gemoji(), breaks(), shikiPlugin()]

const article = reactive({
  title: '',
  content: '',
})

function handlePublish() {
  if (!article.title.trim()) {
    return
  }

  // const heads = editorRef.value?.el.querySelectorAll('.bytemd-toc>ul>li') as NodeListOf<HTMLLIElement>

  // const articleInfo = {
  //   title: article.title,
  //   content: article.content,
  //   heads: Array.from(heads).map((head: HTMLLIElement) => ({
  //     level: head.classList[0].replace('bytemd-toc-', ''),
  //     text: head.textContent,
  //   })),
  // }
  // console.log(articleInfo)

  emits('publish', article)
}
</script>

<template>
  <div class="hw-full">
    <header h-60px class="dark:bg-[#333]" flex items-center px-30px justify="between">
      <input
        v-model="article.title" text-20px outline-none class="w-60% px-3 py-2 dark:bg-[#333]"
        placeholder="输入文章标题..."
      >
      <div flex-col-center gap-4>
        <p> 草稿箱 </p>
        <p :loading="loading" @click="handlePublish">
          发布
        </p>
        <DarkToggle />
      </div>
    </header>

    <Editor
      ref="editorRef"
      class="h-[calc(100%-60px)] overflow-hidden"
      :plugins="plugins" :locale="zh_Hans" :value="article.content"
      @change="(val: any) => (article.content = val)"
    />
  </div>
</template>

<style scoped>
:deep(.bytemd) {
  height: 100% !important;
}

 :deep(.bytemd-body) {
  height: calc(100% - 60px);
 }
</style>
