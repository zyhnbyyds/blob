<script lang='ts' setup>
const { data, status, signOut, signIn } = useAuth()

definePageMeta({
  title: '首页',
  description: '首页描述',
  keywords: '首页关键词',
  auth: false,
})
</script>

<template>
  {{ data }}
  <button v-if="status === 'unauthenticated'" @click="signIn('github', { redirect: true, callbackUrl: '/article/list' })">
    登录
  </button>
  <div v-else>
    <img :src="data?.user?.image ?? ''">
    <span>{{ data?.user?.name }}</span>
  </div>
  <div>
    加载中...
    <img class="h-100px w-100px text-red" src="/svg-icons/SvgSpinners6DotsScaleMiddle.svg">
  </div>

  <NuxtLink to="/article/List">
    文章列表
  </NuxtLink>

  <button
    v-if="status === 'authenticated'"
    @click="signOut()"
  />
</template>

<style scoped></style>
