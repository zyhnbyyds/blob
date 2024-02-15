<script lang='ts' setup>
const status = defineModel<boolean>({ default: false })

function refresh() {
  status.value = true
  setTimeout(() => {
    status.value = false
  }, 2000)
}
</script>

<template>
  <div cursor-pointer text-4 mx-2 mdi:refresh animate-spin animate-duration-1000 :class="status ? 'animate-spin' : 'animate-none'" @click="refresh" />
</template>

<style scoped></style>
