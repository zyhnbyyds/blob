<script lang='ts' setup>
definePageMeta({
  title: 'Profile',
  description: 'Manage your blob profile',
  layout: 'master',
})

const { user, clear } = useUserSession()
</script>

<template>
  <div>
    {{ user }}

    <Button size="sm">
      <div @click="clear">
        Log out
      </div>
    </Button>
  </div>
</template>

<style scoped></style>
