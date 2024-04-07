<script lang="ts" setup>
definePageMeta({
  layout: 'master',
})

const commonBorder = 'border-1px border-#E4E4E7 rounded-4 border-solid'
</script>

<template>
  <div class="h-full p-8">
    <div h-130px grid="~ cols-3 gap-8">
      <div rounded-4 class="bg-#3981F7">
        <div />
      </div>
      <div :class="commonBorder" />
      <div :class="commonBorder" />
    </div>

    <div class="h-[calc(100%-130px-2rem)]" mt-8 grid="~ cols-11 gap-8">
      <div col-span-6 :class="commonBorder" />
      <div col-span-5 :class="commonBorder" />
    </div>
  </div>
</template>

<style scoped></style>
