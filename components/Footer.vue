<script lang="ts" setup>
defineOptions({
  name: 'BottomFooter',
})
</script>

<template>
  <div text="xl gray4" m-5 flex="~ gap3" justify-center>
    <NuxtLink i-carbon:home to="/" />
    <a
      i-carbon-logo-github
      href="https://github.com/zhang771/my-daily-life.git"
      target="_blank"
    />
    <DarkToggle />
  </div>
</template>
