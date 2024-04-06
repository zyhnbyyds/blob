<script lang="ts" setup>
</script>

<template>
  <div scrollbar="~ w-1" class="h-100vh w-full flex overflow-hidden bg-common text-common">
    <ManageLeftSideBar />

    <div flex-1 overflow-hidden>
      <slot />
      <DarkToggle />
    </div>
  </div>
</template>

<style scoped></style>
