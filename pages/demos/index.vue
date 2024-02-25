<script lang="ts" setup>
definePageMeta({
  auth: false,
});

const renderVal = `# 啊实打实的

## 你干嘛哎呦

| 1 | 2 |
| --- | --- |
| 测试 | 页面 |

1. 123123
2. 123123123
3. 43245325
`;
</script>

<template>
  <div>
    <ContentRenderer :value="{ body: renderVal }" />
  </div>
</template>

<style scoped></style>
