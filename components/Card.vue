<script lang="ts" setup>
export interface CardType {
  title: string
  border: boolean
  shadow: boolean
}

defineOptions({
  name: 'Card',
})
</script>

<template>
  <div class="border border-light-500 rounded-3 px-4 py-4 shadow-md">
    <div class="">
      <slot name="header" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
