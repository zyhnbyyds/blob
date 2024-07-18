<script lang='ts' setup>
definePageMeta({
  layout: 'master',
})

const menus = [
  {
    title: 'HoverBox',
    key: 'HoverBox',
  },
]

const active = ref<string>(menus[0].key)
</script>

<template>
  <div hw-full flex gap-5>
    <div class="h-full w-200px">
      <BMenu v-model="active" :menus="menus" />
    </div>

    <div h-full flex-1>
      <div v-if="active === 'HoverBox'" flex gap-2>
        <HoverBox position="top">
          测试内容
        </HoverBox>

        <HoverBox position="bottom">
          测试内容
        </HoverBox>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
