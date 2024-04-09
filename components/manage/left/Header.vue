<script lang='ts' setup>
defineProps<{
  isFold: boolean
}>()
</script>

<template>
  <div h-96px flex-col-center gap-2 px-4>
    <img h-6 w-6 rounded-full src="/public/logo.ico" alt="logo">
    <Transition
      name="fade" :duration="{
        enter: 150,
        leave: 50,
      }"
    >
      <h1 v-if="!isFold" text-6 class="text-#0a112f transition-colors dark:text-gray-200" font-bold>
        Manage
      </h1>
    </Transition>
  </div>
</template>

<style scoped></style>
