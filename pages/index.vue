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
  <div scrollbar="~  rounded thumb-color-red300 track-color-[rgba(0,0,0,0.3)]">
    <button v-if="status === 'unauthenticated'" @click="signIn('github', { redirect: true, callbackUrl: '/article/list' })">
      登录
    </button>
    <div v-else>
      <img :src="data?.user?.image ?? ''">
      <span>{{ data?.user?.name }}</span>
    </div>

    <NuxtLink to="/article/List">
      文章列表
    </NuxtLink>

    <NuxtLink to="/manage/article">
      文章管理
    </NuxtLink>

    <button
      v-if="status === 'authenticated'"
      @click="signOut()"
    />
  </div>
</template>

<style scoped></style>
