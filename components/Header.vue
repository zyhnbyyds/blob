<script lang="ts" setup>
import type { TabItem } from './Tab.vue'

defineOptions({
  name: 'TopHeader',
})

const props = withDefaults(defineProps<Props>(), {
  show: true,
})

interface Props {
  paths: TabItem[]
  show: boolean
}

const app = useAppConfig()

const activeIndex = ref<string>('')
</script>

<template>
  <div class="flex justify-center py2 font-600">
    <Tab
      v-model:value="activeIndex"
      :follow-change="true"
      :is-route="true"
      :tabs="props.paths"
    >
      <template #extra>
        <DarkToggle class="px-2" />
      </template>
      <template #default="{ data }">
        <div v-if="app.isHeaderTextOrIcon === 'text'">
          {{ data.label }}
        </div>
        <div v-else-if="app.isHeaderTextOrIcon === 'icon'">
          <Icon :name="data.icon ?? 'emojione:broken-heart'" />
        </div>
      </template>
    </Tab>
  </div>
</template>

<style scoped></style>
