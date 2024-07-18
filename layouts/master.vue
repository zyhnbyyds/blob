<script lang="ts" setup>
</script>

<template>
  <div class="h-100vh w-full flex bg-common text-common">
    <ManageLeftSideBar shrink-0 />

    <div h-full min-w-3xl flex-1>
      <ManageMain shrink-0>
        <slot />
      </ManageMain>
    </div>
  </div>
</template>

<style scoped></style>
