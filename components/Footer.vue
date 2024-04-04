<script lang="ts" setup>
const app = useAppConfig()
</script>

<template>
  <div text="xl gray4" border-t="1px solid gray-400 op30" mx-5 h-65px flex justify-center p-5>
    <div flex="~ gap1 col-center" transition-all hover="op40">
      <img h-4 w-4 src="https://beian.miit.gov.cn/img/bg_logo.2ce2f33d.png" alt="工信部" srcset="">
      <NuxtLink external text-common target="_blank" to="https://mydailylife.oss-cn-shanghai.aliyuncs.com/ipc-logo.png">
        {{ app.icp }}
      </NuxtLink>
    </div>
  </div>
</template>
