<script lang="ts" setup>
</script>

<template>
  <div scrollbar="~ w-1" class="h-100vh w-full flex overflow-hidden bg-common text-common">
    <ManageLeftSideBar />

    <div h-full min-w-3xl flex-1 overflow-hidden>
      <ManageMain>
        <slot />
      </ManageMain>
    </div>
  </div>
</template>

<style scoped></style>
