<script lang="ts" setup>
const defaultLayoutRef = ref<HTMLDivElement>()

const { y } = useScroll(defaultLayoutRef)

function goTop() {
  y.value = 0
}
</script>

<template>
  <div
    ref="defaultLayoutRef"
    scrollbar="~ w-12px dark:thumb-color-dark-100 dark:track-color-#1a1a1a"
    class="h-100vh w-full overflow-x-hidden <sm:scrollbar-none bg-common text-common"
  >
    <div h-70px />

    <div class="min-h-[calc(100%-135px)]">
      <slot />
    </div>

    <ToTop :top="Math.abs(y)" @go-top="goTop()" />

    <!-- <Footer /> -->
  </div>
</template>

<style scoped></style>
