<script lang='ts'>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  setup() {
    definePageMeta({
      layout: 'empty',
    })

    const editorRef = shallowRef()
    const editorIptRef = shallowRef()
    const colorMode = useColorMode()
    const editorThemeBgColor = useCssVar('--w-e-textarea-bg-color', editorIptRef)
    const editorTextColor = useCssVar('--w-e-textarea-color', editorIptRef)

    watchEffect(() => {
      if (colorMode.value === 'dark') {
        editorThemeBgColor.value = '#1e1e1e'
        editorTextColor.value = '#fff'
      }
      else {
        editorThemeBgColor.value = '#f8f9fa'
        editorTextColor.value = '#000'
      }
    })

    const article = reactive({
      title: '',
      content: '',
    })

    const toolbarConfig = {
      excludeKeys: ['headerSelect', 'italic', 'group-more-style'],
    }
    const editorConfig = { placeholder: '🎉🎉🎉🎉🎉🤓' }

    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null)
        return
      editor.destroy()
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor
    }

    return {
      editorRef,
      mode: 'simple',
      toolbarConfig,
      editorConfig,
      handleCreated,
      editorIptRef,
      article,
    }
  },
}
</script>

<template>
  <div class="px-30px h-full">
    <header h-60px flex justify="between">
      <input v-model="article.title" placeholder="请输入标题">
      <DarkToggle />
    </header>

    <div md="grid grid-cols-2" class="h-[calc(100%-60px)]">
      <div class="flex flex-col">
        <Toolbar
          flex="1"
          :editor="editorRef"
          :default-config="toolbarConfig"
          :mode="mode"
        />
        <Editor
          ref="editorIptRef"
          v-model="article.content"
          flex-1
          :default-config="editorConfig"
          :mode="mode"
          @on-created="handleCreated"
        />
      </div>

      <div class="<md:hidden">
        <div v-html="article.content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.w-e-toolbar) {
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
  height: 40px;
}

:deep(.w-e-toolbar::-webkit-scrollbar) {
  display: none;
}
</style>
