<script lang="ts" setup>
const app = useAppConfig()

function refresh() {
  app.pageLoading = true
}
</script>

<template>
  <div
    mdi:refresh
    mx-2
    animate-spin
    animate-duration-1000
    cursor-pointer
    text-4
    :class="app.pageLoading ? 'animate-spin' : 'animate-none'"
    @click="refresh"
  />
</template>

<style scoped></style>
