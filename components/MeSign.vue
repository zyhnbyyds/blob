<script lang='ts' setup>
const app = useAppConfig()
</script>

<template>
  <div
    relative mr-1 flex cursor-pointer rounded-1 px-3 py-1.5
    hover:after:block
    class="after:ab-x-c after:absolute after:bottom-0 after:h-2 after:w-[calc(100%-30px)] after:shadow-md after:blur-2 after:transition-all after:content-[''] after:hidden"
  >
    <span class="text-6 font-bold font-ljmc">{{ app.me.name }}</span>
  </div>
</template>

<style scoped></style>
