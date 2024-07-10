<script lang="ts" setup>
const app = useAppConfig()
</script>

<template>
  <div text="sm gray4" mx-5 flex justify-center p-5 pt-2>
    <div v-if="app.icp" flex="~ gap1 col-center" transition-all hover="op70">
      <NuxtLink external text-common class="text-3" target="_blank" to="https://beian.miit.gov.cn/">
        {{ app.icp }}
      </NuxtLink>
    </div>
  </div>
</template>
