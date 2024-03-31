<script setup lang="ts">
import { codes } from './config/errorCode'
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <div class="h-100vh flex-center flex-col bg-common text-common">
    <h1 mb-4 text-5 font-bold>
      {{ codes[props.error?.statusCode ?? 'unknown'].title }}
    </h1>
    <NuxtLink class="rounded-full bg-blue-600 px-5 py2 text-white transition-colors" hover="bg-blue-400" to="/">
      Go back home
    </NuxtLink>
  </div>
</template>
