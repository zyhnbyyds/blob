<!-- 超出展示 -->
<script lang="ts" setup>
defineOptions({
  name: 'ToTop',
})

defineProps<{
  top: number
}>()

const emits = defineEmits<{ (event: 'goTop'): void }>()

const { pageScroolTop } = useAppConfig()
</script>

<template>
  <Transition name="fade-scale">
    <div
      v-if="top > pageScroolTop"
      class="i-solar:round-arrow-up-broken fixed bottom-3 right-10 z-10 h-7 w-7 flex-center cursor-pointer rounded-5 bg-#666 dark:bg-#bbb"
      @click.capture="emits('goTop')"
    />
  </Transition>
</template>

<style scoped></style>
