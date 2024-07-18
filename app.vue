<script setup lang="ts">
onNuxtReady(() => {
  const colorMode = useColorMode()
  const isPrefersDark = usePreferredDark()

  watch(
    () => isPrefersDark.value,
    (val) => {
      colorMode.preference = val ? 'dark' : 'light'
    },
    {
      immediate: true,
    },
  )
})

const { y } = useWindowScroll({ behavior: 'smooth' })

function goTop() {
  y.value = 0
}
</script>

<template>
  <div class="relative z-1 min-h-full bg-common text-common" scrollbar="~ w-12px dark:thumb-color-dark-100 dark:track-color-#1a1a1a">
    <NuxtLayout>
      <NuxtPage keepalive />
    </NuxtLayout>
    <MessageBox />
    <ToTop :top="Math.abs(y)" @go-top="goTop()" />
  </div>
</template>

<style lang="scss">
@import url(./style/scss/global.scss);
@import url(./style/css/global.css);
</style>
