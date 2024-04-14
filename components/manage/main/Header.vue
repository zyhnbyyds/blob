<script lang='ts' setup>
const { loggedIn, user } = useUserSession()
</script>

<template>
  <div class="h-25 flex-col-center justify-between px-4 py-3">
    <h1 text-8 class="text-#0A112F font-600 transition-colors dark:text-gray-200">
      Good morning blob.
    </h1>

    <div flex-col-center gap-7>
      <DarkToggle />

      <Button size="md" icon="carbon:add-filled">
        Post Some New
      </Button>

      <NuxtLink v-if="loggedIn" to="/manage/profile" flex gap-3 rounded-full px-4 py-2 transition-colors hover:bg-light-600 hover:dark:bg-dark-300>
        <img :src="user?.avatar_url" h-8 w-8 rounded-full>

        <div flex flex-col justify-between>
          <h4 text-sm font-500 class="text-#0A112F transition-colors dark:text-gray-400">
            {{ user?.login }}
          </h4>
          <h5 text-3 class="text-#70707A">
            Developer
          </h5>
        </div>
      </NuxtLink>

      <div v-else>
        <NuxtLink external to="/api/auth/github">
          <Button size="sm" bg-gray-500>
            Sign In
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
