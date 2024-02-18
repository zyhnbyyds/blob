<script lang="ts" setup>
// @ts-expect-error ignore
import { Viewer } from '@bytemd/vue-next';
import gfm from '@bytemd/plugin-gfm';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import breaks from '@bytemd/plugin-breaks';
import highlight from '@bytemd/plugin-highlight';

import { type MdTheme, themes } from '@/config/bytemd';

defineOptions({
  name: 'ArticleViewer',
});

const props = defineProps<{
  content: string;
}>();

const plugins = [frontmatter(), gfm(), gemoji(), breaks(), highlight()];

const activeTheme = ref<MdTheme>('hydrogen');

watch(
  activeTheme,
  (val) => {
    byteToggleTheme(val, import.meta.url);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div>
    <a-select v-model:value="activeTheme" w-200px>
      <a-select-option v-for="item in themes" :key="item">
        {{ item }}
      </a-select-option>
    </a-select>
    <Viewer :value="props.content" :plugins="plugins" />
  </div>
</template>

<style scoped></style>
