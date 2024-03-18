<script lang="ts" setup>
// @ts-expect-error ignore
import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import highlight from '@bytemd/plugin-highlight'

defineOptions({
  name: 'ArticleViewer',
})

const props = defineProps<{
  content: string
}>()

const plugins = [frontmatter(), gfm(), gemoji(), breaks(), highlight()]
</script>

<template>
  <Viewer :value="props.content" :plugins="plugins" />
</template>

<style scoped></style>
