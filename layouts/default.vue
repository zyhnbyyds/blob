<script lang='ts' setup>
const tabs = ref([
  {
    label: '文章',
    value: '/article/list',
  },
  {
    label: '案例',
    value: '/demos',
  },
])

const active = ref(tabs.value[0].value)
</script>

<template>
  <div scrollbar="~ rounded w-1" class="h-100vh text-common bg-common">
    <div w-full flex gap-20px items-center p-30px pl-60px>
      <Tab v-model:value="active" z-100 :tabs="tabs" :is-route="true">
        <template #extra>
          <DarkToggle />
        </template>
      </Tab>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
